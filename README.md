# Move'round - Your relaxed transport planner in Amsterdam

Welcome to the repository of the application Move'round! If you are here, it's probably because you want to appreciate our beautiful code. Well you are at the right place. Our app was build on AWS using AWS API Gateway to build our own API and AWS Lambda Functions to run our backend. 

Therefore the code that you see in the Jupyter notebooks and python functions is actually the code that is implemented in the lambda functions. Sadly an API cannot be exported but here is a screeshot of what it looks like in the aws console : 

<img width="250" alt="image" src="https://user-images.githubusercontent.com/59032005/160786493-6bb06fc7-a724-4735-b395-8618aed6f6ca.png">


Also, here is a screenshot of our lambda functions in the aws console:

<img width="1027" alt="image" src="https://user-images.githubusercontent.com/59032005/160786680-79f27fa3-8b16-4540-8a56-d3474c0d110b.png">

As you can see lambda functions are just pieces of code that are run in the cloud by AWS. No need to take care of servers, this is a serverless architecture! Which means instant scalability and great performances.

### Fronted - React Native, Tailwind CSS, React

We used Rect Native as it makes development easier for both Android and iOS, at the same time! You can see a screenshot of the developed UI, which is user friendly and easy to use. Built with modularity so it is easy to scale and add new content. We also used Expo to test different configurations and devices.

<img width="1027" alt="image3" src="https://github.com/Claw666/relaxed_transport/blob/main/Screenshots/image1.jpeg">

To test the frontend you need to add a Google Maps API which is freely obtainable at the moment. 
