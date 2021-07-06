import { graphql } from 'gatsby'
import React from 'react'

import Layout from '../components/layout'
import Seo from '../components/seo'

const PrivacyPage = ({ location }) => {
  return (
    <Layout location={location}>
      <Seo title="Privacy Policy" />
      <h1>Privacy Policy</h1>
      <p>
        The privacy policy outlines how data is collected when you browse this website. This is a small non-business website and no data is collected
        for the purpose of marketing or advertising. Any personal information collected falls into two categories:
      </p>
      <ol>
        <li>
          <strong>Information you provide: </strong>
          <span>This accounts for any information submitted by you via mechanisms on the site such as a form submission.</span>
        </li>
        <li>
          <strong>Information collected automatically: </strong>
          <span>This is information collected by third party tracking technology, which is solely Google Anlaytics at this time.</span>
        </li>
      </ol>

      <h5>What data is collected?</h5>
      <p>When you visit the website, the following data may be collected: </p>
      <ul>
        <li>Your IP address</li>
        <li>Your name and email address</li>
        <li>Anonymised data profile regarding your online behavior on the website.</li>
      </ul>
      <p>
        A data profile will include information such as the operating system and browser version you are using, the pages you visit, page load times,
        and which website referred you. This can then be used for statistical purposes and generalised usage behaviour.
      </p>

      <h5>Why is this data collected?</h5>
      <p>
        I only collect data for two reasons: to allow users to submit contact requests and to capture basic site analytics which helps me understand
        how users interact with my site.
      </p>

      <h5>Cookie Policy?</h5>
      <p>
        Google Analytics uses persistent first-party cookies to enable their service. This can be disabled by the user by clicking the 'No Thanks'
        option in the cookie consent popup upon which no analytics events will be tracked.
      </p>

      <h5>
        Fin!{' '}
        <span role="img" aria-label="celebration emoji">
          &nbsp; 🎉
        </span>
      </h5>
    </Layout>
  )
}

export default PrivacyPage
