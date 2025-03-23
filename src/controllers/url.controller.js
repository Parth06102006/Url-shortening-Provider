import { Url } from "../models/url.model.js";
import { asyncHandler } from "../utlities/asyncHandler.js";
import { ApiError } from "../utlities/ApiError.js";
import { ApiResponse } from "../utlities/ApiResponse.js";

function generateURL()
{
    console.log('URL shortening start')
    const text = 'abcdefghijklmnopqrstuvwxyz';
    const utext = 'ABCDEFGHIJKLMONPQRSTUVWXYZ';
    const number = '1234567890';
    const values = text+utext+number;
    let createURL;
    console.log(values.length);
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
    console.log(createURL);
    return createURL;
}

export const createShortURL = asyncHandler(async(req,res)=>
    {
        console.log('Start')
        const {url} = req.body;

        console.log(url)
        if(!url)  
        {
            throw new ApiError(400,'Url is missing');
        }

        const existingUrl = await Url.findOne({url});
        console.log(existingUrl);
        if(existingUrl)
        {
            throw new ApiError(403,'Url is already present');
        }

        const shortUrl = generateURL();

        console.log('ShortURL->',shortUrl);

        if(!shortUrl)
        {
            throw new ApiError(400,'Error creating the shortUrl');
        }

        try {
            console.log('Url is being getting started to enter into db')
            const newUrl = await Url.create({url,shortUrl});
            console.log(newUrl);
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

        console.log('The original url is being started being fetched')
        const shortId = req.params.shortId;
        console.log(shortId);
        if(!shortId)
        {
            throw new ApiError('Kindly enter the short url');
        }

        console.log('Search for the original url has been started')
        const originalURL = await Url.findOne({shortUrl:shortId});
        console.log('Check for the existence')
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
    console.log('Started')
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