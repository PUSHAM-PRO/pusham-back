export const generateEmailTemplate = (content) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">

    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">

    <h1 style="color: #4CAF50; text-align: center;">PUSHAM POWER OUTAGE NOTIFICATION</h1>

      <div style="color: #333; font-size: 16px; line-height: 1.5;">
        ${content}
      </div>

      <footer style="margin-top: 20px; font-size: 14px; color: #777; text-align: center;">
        <p style="color: #4CAF50;">© 2024 PUSHAM. All rights reserved.</p>
      </footer>

    </div>
  </div>
`;
export const signupEmailTemplate = (content) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">

    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">

    <h1 style="color: #4CAF50; text-align: center;">PUSHAM USER REGISTRATION</h1>

      <div style="color: #333; font-size: 16px; line-height: 1.5;">
        ${content}
      </div>

      <footer style="margin-top: 20px; font-size: 14px; color: #777; text-align: center;">
        <p style="color: #4CAF50;">© 2024 PUSHAM. All rights reserved.</p>
      </footer>

    </div>
  </div>
`;
export const loginEmailTemplate = (content) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">

    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">

    <h1 style="color: #4CAF50; text-align: center;">PUSHAM USER LOGIN NOTICE</h1>

      <div style="color: #333; font-size: 16px; line-height: 1.5;">
        ${content}
      </div>

      <footer style="margin-top: 20px; font-size: 14px; color: #777; text-align: center;">
        <p style="color: #4CAF50;">© 2024 PUSHAM. All rights reserved.</p>
      </footer>

    </div>
  </div>
`;
export const updateEmailTemplate = (content) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">

    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">

    <h1 style="color: #4CAF50; text-align: center;">PUSHAM USER UPDATE NOTICE</h1>

      <div style="color: #333; font-size: 16px; line-height: 1.5;">
        ${content}
      </div>

      <footer style="margin-top: 20px; font-size: 14px; color: #777; text-align: center;">
        <p style="color: #4CAF50;">© 2024 PUSHAM. All rights reserved.</p>
      </footer>

    </div>
  </div>
`;
