import { Url } from "../models/url.model.js";
import { asyncHandler } from "../utlities/asyncHandler.js";
import { ApiError } from "../utlities/ApiError.js";
import { ApiResponse } from "../utlities/ApiResponse.js";
import validator from 'validator';

function generateURL()
{
    const text = 'abcdefghijklmnopqrstuvwxyz';
    const utext = 'ABCDEFGHIJKLMONPQRSTUVWXYZ';
    const number = '1234567890';
    const values = text+utext+number;
    let createURL;
    for(let i=0;i<5;i++)
    {
        if(!createURL)
        {
            createURL = values[Math.floor(Math.random()*values.length)];
        }
        else
        {
            createURL += values[Math.floor(Math.random()*values.length)];
        }
    }
    return createURL;
}

export const createShortURL = asyncHandler(async(req,res)=>
    {
        const {url} = req.body;

        if(!url)  
        {
            throw new ApiError(400,'Url is missing');
        }

        const isValidURL = validator.isURL(url);
        if(!isValidURL) throw new ApiError(400,'Invalid URL entered')

        const existingUrl = await Url.findOne({url});
        if(existingUrl)
        {
            throw new ApiError(403,'Url is already present');
        }

        const shortUrl = generateURL();


        if(!shortUrl)
        {
            throw new ApiError(400,'Error creating the shortUrl');
        }

        try {
            const newUrl = await Url.create({url,shortUrl});
            if(!newUrl)
            {
                throw new ApiError(400,'An error occured');
            }

            const options = 
            {
                _id:newUrl._id,
                url:newUrl.url,
                shortUrl:newUrl.shortUrl,
                createdAt:newUrl.createdAt,
                updatedAt:newUrl.updatedAt
            }
            return res.status(201).json(new ApiResponse(201,options,'ShortURL created successfully'));
        } catch (error) {
            throw new ApiError(400,'Error creating the shortUrl');
        }
    })

export const getOriginalURL = asyncHandler(async(req,res)=>
    {

        const shortId = req.params.shortId;
        if(!shortId)
        {
            throw new ApiError('Kindly enter the short url');
        }

        const originalURL = await Url.findOne({shortUrl:shortId});
        if(!originalURL)
        {
            throw new ApiError(404,'The url does not exsist');
        }
        originalURL.accessCount += 1;
        originalURL.save()
        const options = 
        {
            _id:originalURL._id,
            url:originalURL.url,
            shortUrl:originalURL.shortUrl,
            createdAt:originalURL.createdAt,
            updatedAt:originalURL.updatedAt
        }

        return res.status(200).json(new ApiResponse(200,options,'The original URL fetched succesfully'));
    })

export const updateURL = asyncHandler(async(req,res)=>{
    const shortId = req.params.shortId;
    if(!shortId)
    {
        throw new ApiError('Kindly enter the short url');
    }
    const newShortId = generateURL();
    const existingURL = await Url.findOneAndUpdate({shortUrl:shortId},{$set:{shortUrl:newShortId}},{new:true}).select('-accessCount');
    if(!existingURL)
    {
        throw new ApiError(400,'Error getting the data');
    }
    return res.status(200).json(new ApiResponse(200,existingURL,'The url is updated successfully'));
})

export const deleteURL = asyncHandler(async(req,res)=>{
    const shortId = req.params.shortId;
    console.log(shortId);
    if(!shortId?.trim())
    {
        throw new ApiError('Kindly enter the short url');
    }
    const existingURL = await Url.findOneAndDelete({shortUrl:shortId});
    if(!existingURL)
    {
        throw new ApiError(400,'Error getting the data');
    }
    return res.status(200).json(new ApiResponse(200,existingURL,'The url is deleted successfully'));
})

export const stats = asyncHandler(async(req,res)=>{
    const shortId = req.params.shortId;
    if(!shortId?.trim())
    {
        throw new ApiError('Kindly enter the short url');
    }
    
    const exisitingURL = await Url.findOne({shortUrl:shortId}).catch((error)=>{throw new ApiError(400,'Error fetching the data')});
    return res.status(200).json(new ApiResponse(200,exisitingURL,'Url details fetched successfully'));
})