# AWS Cognito Setup

## References

* http://serverless-stack.com

## Steps

You must create a bucket first. See:

http://serverless-stack.com/chapters/create-an-s3-bucket-for-file-uploads.html

1. Browse to: https://console.aws.amazon.com/cognito/
2. Click: __Manage your User Pools__
3. Click: __Create a User Pool__
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
  --username admin@example.com \
  --password Passw0rd! \
  --user-attributes Name=email,Value=admin@example.com
```

### Example

The password should have at least one cap letter, one number and one symbol

```
$ aws cognito-idp sign-up \
  --region us-east-1 \
  --client-id YOUR-CLIENT-ID \
  --username VALID_EMAIL_ADDRESS \
  --password PASSWORD \
  --user-attributes Name=email,Value=VALID_EMAIL_ADDRESS
```

This triggers an email sent with a confirmation code to the test user.

## Verify the User via the Command Line

```
$ aws cognito-idp admin-confirm-sign-up \
  --region us-east-1 \
  --user-pool-id YOUR_USER_POOL_ID \
  --username admin@YOURDOMAIN.com
```

## Create Identity Pool

Create a federated Cognito identity pool using the User Pool acting as the federated identity provider.

## Steps

1. Browse to: https://console.aws.amazon.com/cognito/
2. Click: __Manage Federated Identities__
3. Click: __Create new identity pool__ (may be different if no other pools exist yet)
4. Set __Identity pool name__: (like *myapp identity pool*)
5. Expand: __Authentication providers__
6. Make sure the __Cognito__ tab is selected
7. Set __User Pool ID__ to the value saved earlier
8. Set __App Client ID__ to the value saved earlier
9. Click: __Create Pool__
10. Expand: __View Details__
11. Expand: __View Policy Document__
12. Click: __Edit__ / __[OK]__
13. Set the value to (replace __YOUR\_S3\_UPLOADS\_BUCKET\_NAME__ - like ```my-app-uploads```):

    ```
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": [
            "mobileanalytics:PutEvents",
            "cognito-sync:*",
            "cognito-identity:*"
          ],
          "Resource": [
            "*"
          ]
        },
        {
          "Effect": "Allow",
          "Action": [
            "s3:*"
          ],
          "Resource": [
            "arn:aws:s3:::YOUR_S3_UPLOADS_BUCKET_NAME/${cognito-identity.amazonaws.com:sub}*"
          ]
        }
      ]
    }
    ```

14. Click: __Allow__
15. Click: __Dashboard__ on the left side menu
16. Make sure your current app is selected
17. Click: __Edit identity pool__
18. Copy and save the __Identity pool id__
19. Click: __Cancel__

## Configuration

See: http://serverless-stack.com/chapters/login-with-aws-cognito.html

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

3. Include the files in src/containers/Login.js, etc.

    ````
    import config from '../config.js';
    ````

4. See: ```src/config.js``` for additional values




