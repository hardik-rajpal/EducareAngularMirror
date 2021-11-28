# Educare

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.


## Installation
Run `npm i` in the same directory as package.json files to install all dependencies
## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
## Features Overview:
- Registration and login dependent on uniques alphanumeric user ID's, like roll numbers.
- Edit details in your profile after registration and change the password (this requires an otp sent to your registered email id on request)
- Create Courses with a code, name and a config file which follows the format below:
######################Config.txt##########################
{"instructors":["200050006"],
"wizards":["200050012","200050048"],
"students":["200050001","200050008"]
}
##########################################################
- Role based permissions: student < wizards < instructors
    - Further distinction between wizards of levels 1, 2 and 3, editable by the instructor and wizards of level 3.
    - Students can access posts and assignments in a course and make submissions.
    - Instructors can:
        - add/remove students/instructors/wizards, edit permissions levels of wizards.
        - create assignments and posts, download submissions, upload feedback and autograders
    - Wizards:3 can do everything the instructors do except:
        - adding/removing professors.
    - Wizards:2 can do everything the wizards:3 do except:
        - creating assignments
        - editing any memberlist
    - Wizards:1 can do everythign the wizards:2 do except:
        - creating posts.
    (Wizards:1 can only download submissions and upload feedback)

