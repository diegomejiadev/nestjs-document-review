export interface IUploadRepository {
  uploadSingleFile(file: Express.Multer.File): Promise<any>;
  getFile(originalName: string): Promise<any>;
  getFileUrl(originalName: string): Promise<string>;
}
