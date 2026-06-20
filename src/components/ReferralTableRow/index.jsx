import { useNavigate } from "react-router-dom"
import { format } from "date-fns"

import "./index.css"

import "./index.css"

const ReferralTableRow = ({ referralDetails }) => {
  const { id, name, serviceName, date, profit } = referralDetails

  const navigate = useNavigate()

  const formatProfit = (profitAmount) =>
    profitAmount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    })

  const formatDate = (referralDate) =>
    format(new Date(referralDate), "yyyy/MM/dd")

  return (
    <tr className="referral-row" onClick={() => navigate(`/referral/${id}`)}>
      <td className="name">{name}</td>
      <td>{serviceName}</td>
      <td>{formatDate(date)}</td>
      <td className="profit">{formatProfit(profit)}</td>
    </tr>
  )
}

export default ReferralTableRow
