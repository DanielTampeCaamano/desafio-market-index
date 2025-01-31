describe('Flujo de selección de instrumento', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4173'); // Ajusta según tu configuración de Vite
  });

  it('actualiza la cabecera, el resumen y el gráfico al seleccionar un instrumento', () => {
    // Escribir en la barra de búsqueda para filtrar instrumentos
    cy.get('input[placeholder="Buscar instrumento..."]').type('BCI');

    // Hacer clic en el instrumento de la lista
    cy.get('.instrument-list').contains('BCI').click();

    // Verificar que la cabecera se actualizó con el instrumento seleccionado
    cy.get('.header').should('contain', 'BCI');

    // Verificar que el resumen muestra datos actualizados
    cy.get('.summary-item').should('contain', 'Cotización');

    // Verificar que el gráfico se haya actualizado (Canvas debería existir)
    cy.get('canvas').should('exist');
  });
});
