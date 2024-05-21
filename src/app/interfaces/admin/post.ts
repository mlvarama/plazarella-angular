export interface PostId {
  idPost: Number;
  title: string;
  URL: string;
  featured: Number;
  status: string;
}


export interface post {
  title: string;
  URL: string;
  abstract: string;
  body: string;
  statusId:Number;
  categoryId:Number;
  image:string;
}


export interface status {
  id: Number;
  name: string;

}
