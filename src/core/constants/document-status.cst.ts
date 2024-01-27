export enum DOCUMENT_STATUS {
  PENDING_REVISION = 'pending', //* El aplicante envia el documento y entra a este estado
  REVIEWER_ASSIGNED = 'reviewer-assigned', //* Se asigna a un reseñador
  REVIEW_APPROVED = 'approved', //* El reseñador lo aprueba
  PENDING_EDITING = 'editing', //* El reseñador indica que hay que modificar
  RETURNED = 'returned', //* El aprobador lo regresa y el reseñador debe ver los puntos
  COMPLETED = 'completed', //* Se completa el proceso
  REJECTED = 'rejected', //* Se rechaza el documento

  //TODO Agregar en caso de contratar un editor
}
