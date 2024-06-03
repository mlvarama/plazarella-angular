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




export interface PostId {
  title: string;
  URL: string;
  abstract: string;
  body: string;
  statusId:Number;
  categoryId:Number;
  image:string;
}



export interface postEdit {
  title: string;
  abstract: string;
  body: string;
  URL: string;
  statusId: Number;
  categoryId: Number;

}

export interface imageEdit {
  id : Number;
  image: string;
}

export interface DataPostEdit {
  post: postEdit;
  image: imageEdit;
}
