import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { format } from "date-fns"

import Cookies from "js-cookie"

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

import "./index.css"

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
}

const ReferralDetails = () => {
  const [referralDetails, setReferralDetails] = useState(null)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const { id } = useParams()

  const getReferralDetails = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress)

      const jwtToken = Cookies.get("jwt_token")

      const url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?id=${id}`

      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      const response = await fetch(url, options)

      if (response.ok) {
        const responseData = await response.json()

        if (responseData.data.referrals.length > 0) {
          setReferralDetails(responseData.data.referrals[0])
          setApiStatus(apiStatusConstants.success)
        } else {
          setApiStatus(apiStatusConstants.failure)
        }
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (e) {
      setApiStatus(apiStatusConstants.failure)
      console.log(e)
    }
  }

  useEffect(() => {
    getReferralDetails()
  }, [id])

  const formatDate = (date) => format(new Date(date), "yyyy/MM/dd")

  const formatProfit = (profit) =>
    profit.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    })

  const renderLoadingView = () => (
    <div className="loader-container">
      <p className="loader">Loading details...</p>
    </div>
  )

  const renderReferralDetails = () => (
    <div className="details-page">
      <Link to="/" className="back-link">
        ← Back to dashboard
      </Link>

      <h1 className="details-heading">Referral Details</h1>

      <p className="details-description">
        Full information for this referral partner.
      </p>

      <div className="details-card">
        <div className="details-card-header">
          <h2>{referralDetails.name}</h2>

          <span className="service-badge">{referralDetails.serviceName}</span>
        </div>

        <div className="details-divider" />

        <div className="detail-row">
          <p className="detail-label">REFERRAL ID</p>
          <p className="detail-value">{referralDetails.id}</p>
        </div>

        <div className="detail-row">
          <p className="detail-label">NAME</p>
          <p className="detail-value">{referralDetails.name}</p>
        </div>

        <div className="detail-row">
          <p className="detail-label">SERVICE NAME</p>
          <p className="detail-value">{referralDetails.serviceName}</p>
        </div>

        <div className="detail-row">
          <p className="detail-label">DATE</p>
          <p className="detail-value">{formatDate(referralDetails.date)}</p>
        </div>

        <div className="detail-row">
          <p className="detail-label">PROFIT</p>
          <p className="detail-value">{formatProfit(referralDetails.profit)}</p>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()

      case apiStatusConstants.success:
        return renderReferralDetails()

      case apiStatusConstants.failure:
        return <p>Referral not found</p>

      default:
        return null
    }
  }

  return (
    <>
      <div className="referral-details-page">
        <Navbar />
        {renderContent()}
      </div>
      <Footer />
    </>
  )
}

export default ReferralDetails
