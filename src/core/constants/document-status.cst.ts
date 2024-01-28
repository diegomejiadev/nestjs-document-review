export enum DOCUMENT_STATUS {
  PENDING_REVISION = 'pending', //* El aplicante envia el documento y entra a este estado
  REVIEWER_ASSIGNED = 'reviewer-assigned', //* Se asigna a un reseñador
  PENDING_EDITING = 'pending-editing', //* El reseñador indica que hay que modificar
  REVIEWER_RECHECK = 'reviewer-recheck', //* El aplicante actualizó el documento y esta a la espera de una nueva respuesta del reseñador
  REVIEW_APPROVED = 'review-approved', //* El reseñador lo aprueba
  APPROVER_ASSIGNED = 'approver-assigned', //* Tras aprobarse por el reseñador, un aprobador va a tomarlo
  RETURNED = 'returned', //* El aprobador lo regresa y el reseñador debe ver los puntos
  APPROVER_RECHECK = 'approver-recheck', //* El aplicante actualizó el documento, pasando a 
  COMPLETED = 'completed', //* Se completa el proceso
  REJECTED = 'rejected', //* Se rechaza el documento

  //TODO Agregar en caso de contratar un editor
}
