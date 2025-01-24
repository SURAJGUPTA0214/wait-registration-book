/* eslint-disable react-hooks/exhaustive-deps */
import { Card, List, Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

const WaitingList = () => {
  // Fetch the submissions data from the Redux store
  const waitingRegistration = useSelector(
    (state) => state.waitingRegistration.waitingRegistration.submissions
  );

  // Use useMemo to memoize filtered data
  const submissions = useMemo(() => {
    return waitingRegistration?.filter(
      (submission) =>
        submission.inviteCode !== "austin234" &&
        submission.inviteCode !== "alvin145" &&
        submission.inviteCode !== "karthik321"
    );
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

  return (
    <Card>
      <div className="d-flex justify-content-between">
        <h3>General Waiting List</h3>
        <p>Count: {submissions?.length || 0}</p>
      </div>
      
      <div id="scrollableDiv" style={{ height: "400px", overflowY: "auto" }}>
        <InfiniteScroll
          dataLength={data.length} // This ensures the scroll component knows how much data exists
          next={() => setPage((prevPage) => prevPage + 1)} // Load more data when scrolled to the bottom
          hasMore={true} // If more data is available to load
          loader={<Spin />} // Show a loading spinner while fetching data
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>No more data available</b>
            </p>
          } // Message when no more data is available
          scrollThreshold={0.8} // Load more when scrolled to 80% of the container height
          scrollableTarget="scrollableDiv"
        >
          {console.log("data", data)}
          <List
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item key={`${item.item}${index}`}>
                <List.Item.Meta title={<p>{index+1}. {item.username} {item?.auto ? '(auto)' : ''}</p>} />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </Card>
  );
};
export default WaitingList;
