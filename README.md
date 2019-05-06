# M Challenge frontend


## Purpose

Frontend code for the M challenge. 
The application can be found at: http://134.209.101.26

*Caveats* : The password are transfered and stored in plain text for the purpose of this challenge as it deserve a lot of test to ensure encryption and storage are secure in a real environment.

## Technical description

The frontend is basedon Angular 7 and is entirely created in TypeScript.
The code is scaffolded in 2 separate parts. 
Shared services and components as well as individual components.


## Deployment

Deployment can be done using automation websites or tools. Experiments have been made with CircleCI. As it is only static assets it could be deployed on AWS s# and frontend by Cloudfront or any other CDN to speed content delivery.

## Additional enhancements

- Add tracking id from the client to track request end to end for debugging.
- Add more secure ways to login/register (OAuth, Webauthn, ...)
