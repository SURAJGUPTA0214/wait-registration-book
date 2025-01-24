
import { Alert } from 'antd'

const NextAlert = ({ description, type, className, showIcon, icon })=> {
  return <>
    {
      <Alert
        type={type}
        description={description}
        className={`${className} error-msg`}
        showIcon = {showIcon}
        icon={icon}
      />
    }
  </>
}

export default NextAlert