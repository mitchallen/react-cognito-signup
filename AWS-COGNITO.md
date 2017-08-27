# AWS Cognito Setup


## Steps

1. Browse to: https://console.aws.amazon.com/cognito/
2. Click: __Manage your User Pools__
3. Click: __Create a user pool__
4. Enter a __Pool name__ (example: *my-app-user-pool*)
5. Click: __Review defaults__
6. Click: __Create pool__ (at bottom of page)
7. Save __Pool id__ and __Pool ARN__ which will be needed later
8. Click: __App clients__ in the left side menu
9. Click: __Add an app client__ (like *my-app*)
10. UN-select: __Generate client secret__ (unselect because user pool apps with a client secret are not supported by JavaScript SDK)
11. Select: __Enable sign-in API for server-based authentication__ (required by AWS CLI when managing the pool users via command line interface)
12. Click: __Create app client__
13. Save __App client id__

## Testing Cognito

You must do a one time setup to use some command line features that are currently in preview:

```
$ aws configure set preview.cloudfront true
```

## Create a Test User 

__Note that the email used (in two places below) must be valid because a confirmation will be sent there.__

```
$ aws cognito-idp sign-up \
  --region us-east-1 \
  --client-id YOUR_COGNITO_APP_CLIENT_ID \
  --username VALID_EMAIL_ADDRESS \
  --password PASSWORD \
  --user-attributes Name=email,Value=VALID_EMAIL_ADDRESS
```

### Example

The password should have at least one cap letter, one number and one symbol

```
$ aws cognito-idp sign-up \
  --region us-east-1 \
  --client-id YOUR_COGNITO_APP_CLIENT_ID \
  --username admin@example.com \
  --password Passw0rd! \
  --user-attributes Name=email,Value=admin@example.com
```

This triggers an email sent with a confirmation code to the test user.

## Verify the User via the Command Line

```
$ aws cognito-idp admin-confirm-sign-up \
  --region us-east-1 \
  --user-pool-id YOUR_USER_POOL_ID \
  --username admin@YOURDOMAIN.com
```

## Configuration

1. Create: ```src/config.js```
2. Paste in this content and replace the values:

    ```
    export default {
      cognito: {
        USER_POOL_ID : 'YOUR_COGNITO_USER_POOL_ID',
        APP_CLIENT_ID : 'YOUR_COGNITO_APP_CLIENT_ID',
      }
    };
    ```

3. Include the file in your source.

    ````
    import config from '../config.js';
    ````

4. See: ```src/config.js``` for additional values




