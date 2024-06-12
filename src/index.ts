import { IProductServicies, IProduct } from './interfaces';

class ProductList implements IProductServicies{
    private productList: IProduct[] = [];
    private id: number = 1;

    createProduct(data: { name: string; price: number; }): IProduct {
        const newProduct: IProduct = {
            id: this.id++,
            name: data.name,
            price: data.price,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        this.productList.push(newProduct);

        return newProduct;
    }

    getProducts(): IProduct[] {
        return this.productList;
    }

    getOneProduct(id: number): IProduct | undefined {
        const productFiltered = this.productList.find(product => product.id === id);
        return productFiltered;
    }

    updateProduct(id: number, data: { name?: string | undefined; price?: number | undefined; }): IProduct {
        const product = this.getOneProduct(id);
        if (!product) {
            throw new Error('Product not found');
        }
        if (data.name !== undefined) {
            product.name = data.name;
        }
        if (data.price !== undefined) {
            product.price = data.price;
        }
        product.updatedAt = new Date();
        return product;
    }

    deleteProduct(id: number): { message: string } {
        const index = this.productList.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        this.productList.splice(index, 1);
        return { message: 'Product successfully deleted.' };
    }
}

export const productList = new ProductList();