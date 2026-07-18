export default function Terms() {
  return (
    <div className="page-container" style={{ maxWidth: 750, margin: '60px auto', padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>Terms & Privacy</h1>
      <div style={{ lineHeight: 1.75, color: 'var(--color-ink)' }}>
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 40 }}>Terms of Submission</h2>

        <p>By submitting a letter, you acknowledge and agree that:</p>

        <h3>1. What happens to your submission</h3>
        <p>
          If you choose to share a letter publicly, it will appear on the public feed and
          on its own page, viewable and searchable by anyone. If you send a letter
          privately, only the recipient you specify (via their email) can view it, using a
          unique link. We do our best to keep the site running reliably, but we don't
          guarantee uninterrupted access.
        </p>

        <h3>2. Deleting your letters</h3>
        <p>
          Unlike some letter-sharing sites, you retain control over what you post. You can
          delete any letter you've written at any time from your dashboard, and it will be
          permanently removed from public view and our database.
        </p>

        <h3>3. You own what you write, and you confirm you have the right to submit it</h3>
        <p>
          You retain ownership of the content of your letters. You represent that you have
          the right to submit the content you post, and that doing so doesn't infringe on
          anyone else's rights.
        </p>

        <h3>4. License you grant us</h3>
        <p>
          By submitting a letter, you grant PaperPlanes a non-exclusive, worldwide,
          royalty-free license to store, host, display, and transmit that content for as
          long as it remains posted, solely for the purpose of operating the site (for
          example, showing it on the feed or emailing it to a private recipient). This
          license ends when you delete the letter.
        </p>

        <h3>5. Content you may not submit</h3>
        <p>Your submissions must not contain:</p>
        <ul>
          <li>Doxxing or identifying information about a third party without their consent (full names, addresses, phone numbers, workplaces, or links that identify someone else)</li>
          <li>Hate speech, slurs, or content that discriminates based on ethnicity, race, religion, disability, sexual orientation, gender identity, or similar characteristics</li>
          <li>Threats, harassment, or content intended to intimidate or harm someone</li>
          <li>Unlawful, defamatory, or sexually explicit content</li>
        </ul>
        <p>
          We reserve the right to remove any letter that violates these guidelines without
          notice.
        </p>

        <h3>6. Content is the submitter's responsibility</h3>
        <p>
          We don't review every letter before it's posted. Content reflects the views of
          whoever wrote it, not PaperPlanes, and we aren't responsible for it. If you
          believe a letter violates these guidelines, contact us through the footer links.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 40 }}>Terms of Use</h2>

        <h3>1. Who may use PaperPlanes</h3>
        <p>
          By using PaperPlanes, you agree to these terms. You must be able to legally
          consent to these terms in your country to use the site.
        </p>

        <h3>2. Your account</h3>
        <p>
          You sign in using your Google account — this creates your PaperPlanes account
          automatically on first login. You're responsible for keeping your Google account
          secure, since that's what protects access to PaperPlanes.
        </p>

        <h3>3. Your username</h3>
        <p>
          You choose a unique username when you first sign in. This is what's shown
          publicly on letters you share; your real name and email are never shown
          publicly.
        </p>

        <h3>4. Acceptable use</h3>
        <p>
          Don't use PaperPlanes to harass, threaten, or harm others, impersonate someone
          else, post illegal content, or attempt to interfere with the site's normal
          operation (for example, scraping content or attempting unauthorized access). We
          reserve the right to suspend or remove accounts that violate this.
        </p>

        <h3>5. No warranty</h3>
        <p>
          PaperPlanes is provided as-is, without warranties of any kind. We aren't liable
          for any damages arising from your use of the site, to the extent permitted by
          law.
        </p>

        <h3>6. Changes to these terms</h3>
        <p>
          We may update these terms as the site evolves. Continued use after a change
          means you accept the updated terms. Material changes will be reflected by an
          updated "Last updated" date above.
        </p>

        <h3>7. Ending your use</h3>
        <p>
          You may stop using PaperPlanes at any time. We may suspend or terminate access
          for accounts that violate these terms.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 40 }}>Privacy Policy</h2>

        <h3>1. What we collect</h3>
        <p>
          When you sign in with Google, we receive your email address and basic profile
          information to create your account. We store the username you choose, and the
          letters you write — including recipient names and, for private letters,
          recipient email addresses and the pen name you choose to sign with. We don't
          collect payment information, phone numbers, or physical addresses.
        </p>

        <h3>2. How we use it</h3>
        <p>
          Your data is used solely to operate PaperPlanes: authenticating you, displaying
          your letters on your dashboard, showing public letters on the feed, and emailing
          private letter links to the recipients you specify. We don't use your data for
          advertising or sell it to third parties.
        </p>

        <h3>3. Third-party services we use</h3>
        <p>
          <strong>Google</strong> is used solely for sign-in. <strong>Supabase</strong>{' '}
          stores your account data and letters, and handles authentication.{' '}
          <strong>Resend</strong> sends the emails that notify recipients of private
          letters. Each of these providers processes data on our behalf and maintains
          their own security and privacy practices.
        </p>

        <h3>4. Data retention</h3>
        <p>
          Your account and letters are kept for as long as your account exists. You can
          delete any individual letter at any time from your dashboard — this permanently
          removes it. To request full account deletion, contact us through the footer
          links.
        </p>

       <h3>5. Your rights</h3>
        <p>
          You can view and delete any of your own letters at any time through your
          dashboard. You may request a copy of your data or full account deletion by
          contacting us.
        </p>

        <h3>6. Children's privacy</h3>
        <p>
          PaperPlanes is not directed at children. We don't knowingly collect data from
          anyone under the age required to consent to these terms in their jurisdiction.
        </p>

        <h3>7. Changes to this policy</h3>
        <p>
          We may update this policy from time to time. Material changes will be reflected
          by an updated "Last updated" date above.
        </p>

        <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 40 }}>Contact</h3>
        <p>
          Questions about any of the above, or requests regarding your data, can be sent
          through our social links in the footer.
        </p>
      </div>
    </div>
  )
}
