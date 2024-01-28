export enum DOCUMENT_STATUS {
  PENDING_REVISION = 'pending', //* El aplicante envia el documento y entra a este estado
  REVIEWER_ASSIGNED = 'reviewer-assigned', //* Se asigna a un reseñador
  PENDING_EDITING = 'pending-editing', //* El reseñador indica que hay que modificar
  REVIEW_APPROVED = 'review-approved', //* El reseñador lo aprueba
  APPROVER_ASSIGNED = 'approver-assigned', //* Tras aprobarse por el reseñador, un aprobador va a tomarlo
  RETURNED = 'returned-by-approver', //* El aprobador lo regresa y el reseñador debe ver los puntos
  COMPLETED = 'completed', //* Se completa el proceso
  REJECTED = 'rejected', //* Se rechaza el documento

  //TODO Agregar en caso de contratar un editor
}
