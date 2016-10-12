# Department of Labor - Wage and Hour - Section 14c

[![Build status](https://ci.appveyor.com/api/projects/status/gmq5jhbib0ug3rat?svg=true)](https://ci.appveyor.com/project/DOL-WHD-Section14c/master) 
[![Code Climate](https://codeclimate.com/github/AppliedIS/dol-whd-14c/badges/gpa.svg)](https://codeclimate.com/github/AppliedIS/dol-whd-14c) 
[![Javascript Coverage Status](https://coveralls.io/repos/github/AppliedIS/dol-whd-14c/badge.svg?branch=master)](https://coveralls.io/github/AppliedIS/dol-whd-14c?branch=master)
[![DotNet Coverage Status](http://dol-whd-section14c-coverage-dev.azurewebsites.net/badge_combined.svg)](http://dol-whd-section14c-coverage-dev.azurewebsites.net/)
[![dependencies Status](https://david-dm.org/AppliedIS/dol-whd-14c/status.svg?path=DOL.WHD.Section14c.Web)](https://david-dm.org/AppliedIS/dol-whd-14c?path=DOL.WHD.Section14c.Web)

TODO: Project Summary 

## Table of contents

 - [Project Management](#project-management)
 - [Technology Stack](#technology-stack)
 - [System Context Diagram](#system-context)
 - [Conceptual Physical Architecture](#conceptual-physical-archietcture)
 - [Application Compontents](#application)
    - [User Interface](#user-interface)
    - [REST Services](#rest-services)
 - [Deploying](#deploying)
    - [Conceptual Deployment Model](#conceptual-deployment-model)
    - [WebDeploy Packages / Build Artifacts](#webdeploy-packages-/-build-artifacts)
        1. [DOL.WHD.Section14c.Web.zip](1.-DOL.WHD.Section14c.Web.zip)
        2. [DOL.WHD.Section14c.API.zip](2.-DOL.WHD.Section14c.API.zip)
        3. [DotNet.CoverageReport.zip](3.-DotNet.CoverageReport.zip)
## Project Management

Install [Zenhub](https://www.zenhub.com/) extension and view [project board](https://github.com/18F/dol-whd-14c#boards).

### Technology Stack
![Technology Stack](docs/TechStack.png?raw=true "Technology Stack")

### System Context
![System Context](docs/SystemContext.png?raw=true "System Context")

### Conceptual Physical Architecture
![Conceptual Physical Architecture](docs/ConceptualPhysicalArchitecture.png?raw=true "Conceptual Physical Architecture")

## Application Compontents

### User Interface

See [DOL.WHD.Section14c.Web Readme](DOL.WHD.Section14c.Web/Readme.md)

| Project | Description     
| --- | --- 
DOL.WHD.Section14c.Web | AngularJS front-end

### REST Services
```
DOL.WHD.Section14c.sln
```
| Project | Description     
| --- | --- 
DOL.WHD.Section14c.Api | ASP.Net WebAPI REST Services
DOL.WHD.Section14c.Business | .Net Class Library for business services
DOL.WHD.Section14c.Business.Test | MSTest Unit Tests
DOL.WHD.Section14c.Common | .Net Class Libraray for shared coded
DOL.WHD.Section14c.Domain | .Net Class Libarary for entities
DOL.WHD.Section14c.DataAccess | .Net Class Libarary for Entity Framework Context

## Deploying

### Conceptual Deployment Model

![Conceptual Deployment Model](docs/ConceptualDeploymentModel.png?raw=true "Conceptual Deployment Model")

### WebDeploy Packages / Build Artifacts

The projects AppVeyor builds generates three web deployment artifacts.  They can be found in the build under the artifacts tab.  

### 1. DOL.WHD.Section14c.Web.zip
This package contains the front end Web Application.  This is a zip of the WebPack production configuration output found in the /dist folder.  It is not a native WebDeploy package but can be used as one as we are doing with the Appveyor Continuous Deployment.
#### Configuration Settings
All configurations for the Web project are set in the env.js. This file is excluded from Continuous Deployment and should be updated manually if needed.
| Setting | Description | Default   
| --- | --- | ---
api_url | Full URL of the REST API Service | http://localhost:3334 (Local develoment URL)
reCaptchaSiteKey | reCaptcha Site Key | 6LeqeggUAAAAALC5zT4OHbDJk9gHNT0GGZbJMOnG (Development Key with localhost enabled)

### 2. DOL.WHD.Section14c.API.zip
This package is a Web the REST Api
#### Configuration Settings
The following are setup as WebDeploy parameters and can be set with command line MSDeploy arguments or manually via a IIS MMC WebDeploy Package Import.  The parameters are setup to transform their respective values in the Web.config file.  An alternate deployment option would be to exclude the Web.config file and set them in an alternate configuration management process.
| Setting | Description | Default   
| --- | --- | ---
ConnectionString | PostgreSQL database connection string | N/A
ReCaptchaVerfiyUrl | URL Application uses to verifu reCaptcha server-side | https://www.google.com/recaptcha/api/siteverify
ReCaptchaSecretKey | reCaptcha Secret Key sent with the server-side verification.  If this key is not provided the server-side validation will be disabled. | 6LeqeggUAAAAAEY5KpgWZGkOHnkyQXmiSKg7tqsY (Dev key)
UserLockoutEnabledByDefault | Enables or Disabled user login attempt lockout | true
DefaultAccountLockoutTimeSpan | Minutes to lockout user | 15
MaxFailedAccessAttemptsBeforeLockout | Login attempts befer user is locked out | 3

### 3. DotNet.CoverageReport.zip
This artifact contains static files of a ReportGenerator code coverage report for .Net.  This is a development artifact and is not needed for production.