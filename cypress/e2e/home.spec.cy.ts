describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')

		cy.contains('Working').click()
		cy.wait(5000)
		cy.get('[data-testid="pomodoros-concluidos"]').should('have.text', 'Pomodoros Concluídos: 1')
		cy.contains('Working').click()
		cy.wait(5000)
		cy.get('[data-testid="pomodoros-concluidos"]').should('have.text', 'Pomodoros Concluídos: 2')
		cy.contains('Working').click()
		cy.wait(5000)
		cy.get('[data-testid="pomodoros-concluidos"]').should('have.text', 'Pomodoros Concluídos: 3')

  })

})




