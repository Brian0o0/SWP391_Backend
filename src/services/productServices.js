//CRUD of product with database



const express = require('express');
const { pool } = require('../config/database');
const { getCategoryByIds, getCategoryByNames } = require('../services/categoryServices');
const { getCostGemByIds, getGemByIds } = require('../services/gemServices');
const { getCostMaterialByIds, getMaterialByIds } = require('../services/materialServices');
const { Int } = require('msnodesqlv8');


//get all product from database function
const getAllProducts = async () => {
    try {
        await pool.connect();
        var sqlString = "select * from Product";
        const result = await pool.request().query(sqlString);
        const product = result.recordset;
        console.log(product);
        return product;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        pool.close();
    }
}
//get product by id from database function
const getProductByIds = async (productId) => {
    try {
        await pool.connect();
        var sqlString = "select * from Product where ProductID = @productId;";
        const request = pool.request();
        request.input('productId', productId);
        const result = await request.query(sqlString);
        const product = result.recordset;
        console.log(product);
        return product;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        pool.close();
    }
}
//insert product to database function
const insertProducts = async (name, materialId, gemId, categoryId, materialCost, gemCost, productCost, image, quantityGem, size, warrantyCard, description, quantityMaterial) => {
    try {
        await pool.connect();
        const sqlString = `
        INSERT INTO Product (Name, MaterialID, GemID, CategoryID, MaterialCost, GemCost, ProductCost, Image, QuantityGem, Size, WarrantyCard, Description, QuantityMaterial) 
        VALUES (@name, @materialId, @gemId, @categoryId, @materialCost, @gemCost, @productCost, @image, @quantityGem, @size, @warrantyCard, @description, @quantityMaterial)
        `;
        const request = pool.request();
        request.input('name', name);
        request.input('materialId', materialId);
        request.input('gemId', gemId);
        request.input('categoryId', categoryId);
        request.input('materialCost', materialCost);
        request.input('gemCost', gemCost);
        request.input('productCost', productCost);
        request.input('image', image);
        request.input('quantityGem', quantityGem);
        request.input('size', size);
        request.input('warrantyCard', warrantyCard);
        request.input('description', description);
        request.input('quantityMaterial', quantityMaterial);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        return true;
    } catch (error) {
        // Xử lý bất kỳ lỗi nào
        throw new Error("Error inserting product: " + error.message);
        return false;
    }
}
//update product on database function
const updateProductByIds = async (name, materialId, gemId, categoryId, materialCost, gemCost, productCost, image, quantityGem, size, warrantyCard, description, quantityMaterial, productId) => {
    try {
        await pool.connect();
        const sqlString = `
            UPDATE Product
            SET Name = @name, MaterialID = @materialId, GemID = @gemId, CategoryID = @categoryId
            , MaterialCost = @materialCost, GemCost = @gemCost, ProductCost = @productCost, Image = @image
            , QuantityGem = @quantityGem, Size = @size, WarrantyCard = @warrantyCard, Description = @description, QuantityMaterial= @quantityMaterial
            WHERE ProductID = @productId
        `;
        const request = pool.request();
        request.input('name', name);
        request.input('materialId', materialId);
        request.input('gemId', gemId);
        request.input('categoryId', categoryId);
        request.input('materialCost', materialCost);
        request.input('gemCost', gemCost);
        request.input('productCost', productCost);
        request.input('image', image);
        request.input('quantityGem', quantityGem);
        request.input('size', size);
        request.input('warrantyCard', warrantyCard);
        request.input('description', description);
        request.input('quantityMaterial', quantityMaterial);
        request.input('productId', productId);
        // Thực hiện truy vấn
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
//delete product by id on database function
const deleteProductByIds = async (productId) => {
    try {
        await pool.connect();
        const sqlString = `
        DELETE FROM Product WHERE ProductID = @productId
        `;
        const request = pool.request();
        request.input('productId', productId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

const getProductByNameOrIds = async (name) => {
    try {
        await pool.connect();
        var sqlString = "select * from Product where [Name] like @name or ProductID = @id";
        const request = pool.request();
        request.input('name', '%' + name + '%');
        let id
        try {
            id = parseInt(name, 10);
        } catch {
            id = -1;
        }
        request.input('id', id);
        const result = await request.query(sqlString);
        const productTemp = result.recordset;
        console.log(productTemp);
        const productDetails = [];

        for (const product of productTemp) {
            const categoryTemp = await getCategoryByIds(product.CategoryID);

            const gemTemp = await getGemByIds(product.GemID);
            const costGemTemp = await getCostGemByIds(gemTemp[0].CostIDGem);

            const materialTemp = await getMaterialByIds(product.MaterialID);
            const costMaterialTemp = await getCostMaterialByIds(materialTemp[0].CostIdMaterial);
            const prodcuctDetail = {
                ProductId: product.ProductID,
                Name: product.Name,
                GemName: gemTemp[0].Name,
                GemCost: costGemTemp[0].PriceOfGem,
                MaterialName: materialTemp[0].Name,
                MaterialCost: costMaterialTemp[0].PriceOfMaterial,
                CategoryName: categoryTemp[0].Name,
                ProductCost: product.ProductCost,
                Image: product.Image,
                QuantityGem: product.QuantityGem,
                Size: product.Size,
                WarrantyCard: product.WarrantyCard,
                Description: product.Description,
                QuantityMaterial: product.QuantityMaterial
            };
            productDetails.push(prodcuctDetail);
        }
        return productDetails;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        pool.close();
    }
}

const getProductByCategorys = async (categoryName) => {

    try {

        const categoryTemp = await getCategoryByNames(categoryName);
        await pool.connect();
        var sqlString = "select * from Product where CategoryID = @categoryId";
        const request = pool.request();
        request.input('categoryId', categoryTemp[0].CategoryID);
        const result = await request.query(sqlString);
        const productTemp = result.recordset;
        console.log(productTemp);
        const productDetails = [];

        for (const product of productTemp) {
            const gemTemp = await getGemByIds(product.GemID);
            const costGemTemp = await getCostGemByIds(gemTemp[0].CostIDGem);

            const materialTemp = await getMaterialByIds(product.MaterialID);
            const costMaterialTemp = await getCostMaterialByIds(materialTemp[0].CostIdMaterial);

            const prodcuctDetail = {
                ProductId: product.ProductID,
                Name: product.Name,
                GemName: gemTemp[0].Name,
                GemCost: costGemTemp[0].PriceOfGem,
                MaterialName: materialTemp[0].Name,
                MaterialCost: costMaterialTemp[0].PriceOfMaterial,
                CategoryName: categoryTemp[0].Name,
                ProductCost: product.ProductCost,
                Image: product.Image,
                QuantityGem: product.QuantityGem,
                Size: product.Size,
                WarrantyCard: product.WarrantyCard,
                Description: product.Description,
                QuantityMaterial: product.QuantityMaterial
            };
            productDetails.push(prodcuctDetail);
        }

        return productDetails;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        pool.close();
    }
}

module.exports = {
    getAllProducts,
    getProductByIds,
    insertProducts,
    deleteProductByIds,
    updateProductByIds,
    getProductByNameOrIds,
    getProductByCategorys,
}