Feature: Yard Order by TR Management User - Create, Discard, Firm, Push to Summary Sheet, and Cancel yard  Orders

    @auth1
    Scenario: TR user creates a new Yard order and then discards the order
        Given the user creates a new Yard order
        Then the user discards the Yard order

    @auth1
    Scenario: TR user creates, firms, pushes to summary sheet, and cancels a Yard order
        Given the user creates a new Yard order
        Then the user firm the Yard order
        Then the user push the Yard labor order to the summary sheet
        Then the user cancel the Yard order