import { useState, useEffect } from "react"

import Cookies from "js-cookie"
import { format } from "date-fns"

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import DashboardMetric from "../../components/DashboardMetric"
import ReferralTableRow from "../../components/ReferralTableRow"

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
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const itemsPerPage = 10

  const getReferrals = async () => {
    try {
      setIsLoading(true)
      const jwtToken = Cookies.get("jwt_token")

      const url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?search=${search}&sort=${sort}`

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
        setCurrentPage(1)
        setIsLoading(false)
      } else {
        console.log("Unable to fetch referrals")
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getReferrals()
  }, [search, sort])

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text)
  }
  const formatProfit = (profit) =>
    profit.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    })

  const formatDate = (date) => format(new Date(date), "yyyy/MM/dd")

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => prev - 1)
  }

  const totalPages = Math.ceil(
    (dashboardData?.referrals.length || 0) / itemsPerPage,
  )

  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  const totalReferrals = dashboardData?.referrals?.length || 0

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const filteredReferrals =
    dashboardData?.referrals?.slice(startIndex, endIndex) || []

  const from = totalReferrals === 0 ? 0 : startIndex + 1
  const to = Math.min(endIndex, totalReferrals)

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1 className="dashboard-title">Referral Dashboard</h1>
        <p className="dashboard-description">
          Track your referrals, earnings, and partner activity in one place
        </p>
        {isLoading ? (
          <div className="loader-container">
            <p className="loader">Loading dashboard...</p>
          </div>
        ) : (
          <>
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
                    {dashboardData?.serviceSummary.service}
                  </p>
                </li>
                <li className="service-card">
                  <p className="service-title">YOUR REFERRALS</p>
                  <p className="service-info">
                    {dashboardData?.serviceSummary.yourReferrals}
                  </p>
                </li>
                <li className="service-card">
                  <p className="service-title">ACTIVE REFERRALS</p>
                  <p className="service-info">
                    {dashboardData?.serviceSummary.activeReferrals}
                  </p>
                </li>
                <li className="service-card">
                  <p className="service-title">TOTAL REF.EARNINGS</p>
                  <p className="service-info">
                    {dashboardData?.serviceSummary.totalRefEarnings}
                  </p>
                </li>
              </ul>
            </section>

            <section className="section-card" aria-label="Share referral">
              <h2 className="section-title">Refer friends and earn more</h2>

              <div className="referral-container">
                <div className="referral-field">
                  <label htmlFor="referralLink">YOUR REFERRAL LINK</label>
                  <div className="copy-container">
                    <input
                      type="text"
                      id="referralLink"
                      value={dashboardData?.referral.link}
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(dashboardData?.referral.link)
                      }
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="referral-field">
                  <label htmlFor="referralCode">YOUR REFERRAL CODE</label>
                  <div className="copy-container">
                    <input
                      type="text"
                      id="referralCode"
                      value={dashboardData?.referral.code}
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(dashboardData?.referral.code)
                      }
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-card table-section">
              <h1 className="section-title table-section-heading">
                All referrals
              </h1>

              <div className="table-header">
                <div className="search-container">
                  <label htmlFor="searchInput">Search</label>
                  <input
                    type="search"
                    id="searchInput"
                    value={search}
                    placeholder="Name or service..."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="sort-container">
                  <label htmlFor="sortBy">Sort by date</label>
                  <select
                    id="sortBy"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="desc">Newest first</option>
                    <option value="asc">Oldest first</option>
                  </select>
                </div>
              </div>

              <table className="referrals-table">
                <thead>
                  <tr>
                    <th className="name">NAME</th>
                    <th>SERVICE</th>
                    <th>DATE</th>
                    <th>PROFIT</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredReferrals.length > 0 ? (
                    filteredReferrals.map((referral) => (
                      <ReferralTableRow
                        key={referral.id}
                        referralDetails={referral}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="no-results">
                        No matching entries
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="pagination-container">
                <p className="pagination-info">{`Showing ${from}–${to} of ${totalReferrals} entries`}</p>

                <div className="pagination-controls">
                  <button
                    type="button"
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={goToPreviousPage}
                  >
                    Previous
                  </button>

                  {pages.map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={`page-btn ${currentPage === page ? "active" : ""}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    className="pagination-btn"
                    disabled={currentPage === totalPages}
                    onClick={goToNextPage}
                  >
                    Next
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      <Footer />
    </>
  )
}

export default Dashboard
