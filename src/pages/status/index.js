import { Card, Spin, Table, Tag } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const Status = () => {
 
   // Fetch the submissions data from the Redux store
   const waitingRegistration = useSelector(
    (state) => state.waitingRegistration.waitingRegistration.submissions
  );
  console.log('bvvvvgv', waitingRegistration)

  // Use useMemo to memoize filtered data
  const submissions = useMemo(() => {
    return waitingRegistration
  }, [waitingRegistration]);

  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  // const [initialLoad, setInitialLoad] = useState(false);

  // Reset data when submissions change
  useEffect(() => {
    if (submissions?.length > 0 && page === 1) {
      // setData([]);
      setPage(1);
      setHasMore(true);
    }
  }, [submissions]);

  // Function to fetch new data based on page
  const fetchData = async () => {
    console.log('page ', page)
    if (loading) return;
    setLoading(true);
    const startIndex = (page - 1) * 10;
    const newData = submissions?.slice(startIndex, startIndex + 10);
    let newsubmission = [...data, ...newData]
    if (submissions?.length >= newsubmission.length ){
      setData(newsubmission);
    }
     
    if (newData.length < 10) {
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if(data.length < page * 10 ){
      const newData = submissions?.slice(data?.length, page * 10 );
      setData((prevData) => [...prevData, ...newData]);
    }
  }, [submissions])

  useEffect(() => {
    if (submissions?.length > 0) fetchData();
  }, [page, hasMore]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1,
      width: 80,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (_, record) => {
        return(
          <p>{record?.username} {record?.auto ? '(auto)' : ''}</p>
        )
      }
    },
    {
      title: 'Invite Code',
      dataIndex: 'inviteCode',
      key: 'inviteCode',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        let color = 'red';
        if (record?.inviteCode === 'austin234' || record?.inviteCode === 'alvin145' || record?.inviteCode === 'karthik321') {
          color = 'green';
        }
        return <Tag color={color}>{(record?.inviteCode === 'austin234' || record?.inviteCode === 'alvin145' || record?.inviteCode === 'karthik321') ? 'Valid Code' : 'Invalid Code'}</Tag>; // Return colored status as a Tag
      },
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (text, record, index) => {
        const validInviteCodes = ['austin234', 'alvin145', 'karthik321'];
        let invalidCount = 0;
  
        for (let i = 0; i <= index; i++) {
          const row = submissions[i];
          if (!validInviteCodes.includes(row.inviteCode)) {
            invalidCount++;
          }
        }

        if (validInviteCodes.includes(record?.inviteCode)) {
          return '--';
        } else {
          return `${invalidCount} days remaining`;
        }
      },
    },
  ];

  return (
    <>
      <div className="d-flex mb-30">
        <h4 className="content-main-heading fw-medium font-24">Status List</h4>
      </div>
      <div className="d-flex mb-30">
        <p className="">Estimated wait time for invalid code user, Total User count is : <b>{submissions?.length || 0}</b></p>
      </div>
      <Card className="mt-2">
        <div id="scrollableDiv" style={{ height: "450px", overflowY: "auto" }}>
          <InfiniteScroll
            dataLength={data.length}
            next={() => setPage((prevPage) => prevPage + 1)}
            hasMore={true}
            loader={<Spin />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>No more data available</b>
              </p>
            }
            scrollThreshold={0.8}
            scrollableTarget="scrollableDiv"
          >
            <Table
              columns={columns}
              dataSource={data}
              locale={{
                emptyText: 'No Data Available',
              }}
              pagination={false}
              sticky={true}
            />
          </InfiniteScroll>
        </div>
      </Card>
    </>
  );
};

export default Status;
