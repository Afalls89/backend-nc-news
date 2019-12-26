# Project Title

To construct and host a backend server to store information relating to northcoder news. The Information stored includes topics, users, articles and comments. functioanlity will involve the ability to:

- request information on all topics
- request user information by user ID
- request article information by article ID
- update an article by article ID
- Post new comments to articles by article ID
- request infomation of all comments from an article by aticle ID
  - information can be sorted by any valid column, defaults to created_at.
  - information can be ordered in ascending or descending order, defaults to descending.
- request informtion on all articles
  - information can be sorted by any valid column, defaults to created_at.
  - information can be ordered in ascending or descending order, defaults to descending.
  - can filter your query to return information for articles relating to a) a specific author
    b) a specific topic
- update comments by comment ID
- delete comments by comment ID

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

On your local machine using termianl navigate to the directory where you want the repository to be situated.

in the terminal type:

git clone "Repository URL"

git init -y

### Prerequisites

dependencies that need to be installed to run the application:
express: ^4.17.1,
knex: ^0.20.4,
pg: ^7.14.0

Intalling dependencies:

navigate to the route directory of your projects repository using VScode or terminal then type the following:

npm i express knex pg

```
devDependencies that need to be installed to perform testing of the application:
chai": ^4.2.0,
chai-sorted: ^0.2.0,
mocha: ^6.2.2,
supertest: ^4.0.2

Intalling development dependencies:

navigate to the route directory of your projects repository using VScode or terminal then type the following:

npm i chai chai-sorted mocha supertest -D

```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```

Give the example

```

And repeat

```

until finished

```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```

Give an example

```

### And coding style tests

Explain what these tests test and why

```

Give an example

```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

- [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
- [Maven](https://maven.apache.org/) - Dependency Management
- [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Andrew Falls** - _Initial work_ - [Afalls89](https://github.com/Afalls89)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc

```

```
