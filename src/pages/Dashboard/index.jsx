import { useState, useEffect } from "react"

import Cookies from "js-cookie"

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import DashboardMetric from "../../components/DashboardMetric"

import {
  FaDollarSign,
  FaPercentage,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa"

import { FiLink, FiCreditCard, FiRepeat } from "react-icons/fi"

import { BsHourglassSplit } from "react-icons/bs"

import "./index.css"

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)

  useEffect(() => {
    const getReferrals = async () => {
      try {
        const jwtToken = Cookies.get("jwt_token")

        const url =
          "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals"

        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }

        const response = await fetch(url, options)

        if (response.ok) {
          const responseData = await response.json()
          setDashboardData(responseData.data)
          console.log(responseData.data)
        } else {
          console.log("Unable to fetch referrals")
        }
      } catch (e) {
        console.log(e)
      }
    }
    getReferrals()
  }, [])

  return (
    <>
      <div className="dashboard">
        <Navbar />
        <h1 className="dashboard-title">Referral Dashboard</h1>
        <p className="dashboard-description">
          Track your referrals, earnings, and partner activity in one place
        </p>
        <section
          className="section-card"
          role="region"
          aria-label="Overview metrics"
        >
          <h1 className="section-title">Overview</h1>
          <ul className="metrics-container">
            {dashboardData?.metrics.map((metric) => (
              <DashboardMetric key={metric.id} metricDetails={metric} />
            ))}
          </ul>
        </section>

        <section className="section-card">
          <h1 className="section-title">Service summary</h1>
          <ul className="service-container">
            <li className="service-card">
              <p className="service-title">SERVICE</p>
              <p className="service-info service-link">
                {dashboardData.serviceSummary.service}
              </p>
            </li>
            <li className="service-card">
              <p className="service-title">YOUR REFERRALS</p>
              <p className="service-info">
                {dashboardData.serviceSummary.yourReferrals}
              </p>
            </li>
            <li className="service-card">
              <p className="service-title">ACTIVE REFERRALS</p>
              <p className="service-info">
                {dashboardData.serviceSummary.activeReferrals}
              </p>
            </li>
            <li className="service-card">
              <p className="service-title">TOTAL REF.EARNINGS</p>
              <p className="service-info">
                {dashboardData.serviceSummary.totalRefEarnings}
              </p>
            </li>
          </ul>
        </section>

        <section className="section-card">
          <h1 className="section-title">Refer friends and earn more</h1>
        </section>

        <section className="section-card">
          <h1 className="section-title">All referrals</h1>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard
