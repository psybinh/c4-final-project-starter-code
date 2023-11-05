//  Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'vny2855hwe'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  //  Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-lt0yr6gxub2z3lj3.us.auth0.com',            // Auth0 domain
  clientId: 'uwpBaH7gU2BvBwJvTQTErBlw2J3uPGm3',          // Auth0 client id 
  callbackUrl: 'http://localhost:3000/callback'
}
