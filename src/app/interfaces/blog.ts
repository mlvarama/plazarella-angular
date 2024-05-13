export interface BlogEntrance {
    URL: string;
    abstract: string;
    categoryName: string;
    createdAt: string;
    image: string;
    imageName: string;
    postId: number;
    postName: string;
}

export interface FeaturedBlog {
    id: number;
    title: string;
    abstract: string;
    URL: string;
    image: string;
    imageName: string;
    categoryName: string;
}

export interface BlogDetail {
    idPost: number;
    title: string;
    abstract: string;
    body: string;
    createdAt: string;
    category: string;
    image: string;
    imageName: string;
}