export interface DirectoryFrame {
  id?: number;
  name?: string;
  logo: string;
}


export interface CategoryButtonFrame {
  id?: number;
  name?: string;
}

export interface Shop {
  name: string;
  description: string;
  phone: string;
  email: string;
  webPage: string;
  workingDays: string;
  logo: string;
  address: string;
}

export interface Photo {
  name: string;
  image: string;
}

export interface ShopData {
  shop: Shop;
  photos: Photo[];
}
