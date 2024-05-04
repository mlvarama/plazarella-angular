export interface GaleryFrame {
    id?: number;
    name?: string;
    status?: boolean;
    photoName: string;
    photo: string;
}

export interface LightBoxItem {
    src: string;
    caption?: string;
    thumb?: string;
}

export interface GaleryImage {
    name: string;
    image: string;
}

export interface GaleryDetail {
    galery: {
        name: string;
    },
    photos: GaleryImage[];
}