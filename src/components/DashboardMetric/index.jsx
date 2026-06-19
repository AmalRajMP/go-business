import {
  FaDollarSign,
  FaPercentage,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa"

import { FiCreditCard, FiLink, FiRepeat } from "react-icons/fi"
import { BsHourglassSplit } from "react-icons/bs"

import "./index.css"

const metricIcons = {
  balance: <FaDollarSign />,
  discountPct: <FiCreditCard />,
  totalRef: <FiLink />,
  discountAmt: <BsHourglassSplit />,
  commissionAmt: <FaPercentage />,
  totalEarn: <FaMoneyBillWave />,
  commissionDisc: <FaUsers />,
  bankTransfer: <FiRepeat />,
}

const DashboardMetric = (props) => {
  const { metricDetails } = props
  const { id, label, value } = metricDetails

  return (
    <div className="metric-card">
      <div className="metric-icon">{metricIcons[id]}</div>
      <h3 className="metric-value">{value}</h3>
      <p className="metric-label">{label}</p>
    </div>
  )
}

export default DashboardMetric
