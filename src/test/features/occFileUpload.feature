Feature:  OCCFile upload Functionalities
    As a user of the system 
    I want to manage OCC file upload
    So that I can maintain and track OCC assignments

    @sanity @fileUpload
    Scenario: Upload OCC file
        Given OCU management user logged into the application
        Then Go to PMA Employee-OCC File Upload
        Then Upload the valid OCC file and verify the success message
        Then user click on logout button
