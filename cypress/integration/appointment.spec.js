describe("Booking Actions", () => {
  it("should book an interview", () => {
    // Visits the root of our web server
    cy.visit('/')
    // Clicks on the "Add" button in the second appointment
    cy.get(':nth-child(3) > .appointment__add > [data-testid=add]').click()
      .get('[data-testid=student-name-input]')
    // Enters their name
      .type('Bob Test Name')
    // Chooses an interviewer
      .get(':nth-child(1) > .interviewers__item-image').click()
    // Clicks the save button
      .get('.button--confirm').click()
    // Sees the booked appointment
      .get(':nth-child(3) > .appointment__card')
  })

  it("should edit an interview", () => {
    // Visits the root of our web server
    cy.visit('/')
    // Clicks the edit button for the existing appointment
    cy.get('[alt=Edit]').first().click({ force: true })
    // Changes the name and interviewer
      .get('[data-testid=student-name-input]')
      .clear()
      .type('New Student Name')
      .get(':nth-child(1) > .interviewers__item-image').click()
    // Clicks the save button
      .get('.button--confirm').click()
    // Sees the edit to the appointment
    .get(':nth-child(1) > .appointment__card')
  })

  it("should cancel an interview", () => {

    // Visits the root of our web server
    // Clicks the delete button for the existing appointment
    // Clicks the confirm button
    // Sees that the appointment slot is empty
  })
})