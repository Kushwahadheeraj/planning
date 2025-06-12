/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from 'react';
import { useDebounced } from '@/redux/hooks';
import ActionBar from '@/components/ui/ActionBar/ActionBar';
import { useCategoriesQuery } from '@/redux/api/categoryApi';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RefreshCw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ServicePage = () => {
  const query: Record<string, any> = {};
  const [toggleOrder, setToggleOrder] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState(0);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [filteredData2, setFilteredData2] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data } = useCategoriesQuery({...query});

  const uniqueCategorySet = new Set(data?.categories?.map((p:any) => p?.name));
  const uniqueCategoryNames = Array.from(uniqueCategorySet);


  const toggleSortOrder = () => {
    setToggleOrder((prev) => !prev);
    setSortOrder(toggleOrder ? "asc" : "desc");
  };

  const priceData2 = data?.categories?.map((p: any) => parseFloat(p?.price));
  const maxPrice = priceData2 && priceData2.length > 0 ? Math.max(...priceData2) : 0;
  const minPrice = priceData2 && priceData2.length > 0 ? Math.min(...priceData2) : 0;

  const onChange = (value: number[]) => {
    setInputValue(value[0]);
  };

  const resetFilters = () => {
    setSortBy('');
    setSortOrder('');
    setSearchTerm('');
    toast.success("Filters reset successfully");
  };

  const handleCheckboxChange = (categoryName: string) => {
    const index = selectedCategories.indexOf(categoryName);
    let newSelectedCategories: string[] = [];

    if (index === -1) {
      newSelectedCategories = [...selectedCategories, categoryName];
    } else {
      newSelectedCategories = selectedCategories.filter((name) => name !== categoryName);
    }

    setSelectedCategories(newSelectedCategories);

    let updatedFilteredData = [] as any;
    let productPriceRangeData = data?.categories || [];
    const minValue = minPrice;
    const maxValue = maxPrice;

    if (newSelectedCategories.length > 0) {
      updatedFilteredData = data?.categories?.filter((p: any) => {
        return newSelectedCategories.includes(p.name);
      });
    } else {
      updatedFilteredData = data?.categories || [];
    }

    if (inputValue > 1) {
      productPriceRangeData = data?.categories?.filter((p: any) => parseFloat(p?.price) < inputValue) || [];
    }

    const filteredByPrice = productPriceRangeData.filter((item: any) => {
      return parseFloat(item.price) >= minValue && parseFloat(item.price) <= maxValue;
    });

    updatedFilteredData = updatedFilteredData.filter((category: any) => {
      return filteredByPrice.some((item: any) => item.name === category.name);
    });

    setFilteredData(updatedFilteredData);
  };

  useEffect(() => {
    let filteredData2;
    if (inputValue > 1) {
      filteredData2 = filteredData?.filter((p:any) => parseFloat(p?.price) < inputValue);
    } else {
      filteredData2 = filteredData;
    }
    setFilteredData2(filteredData2);
  }, [filteredData, inputValue]);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      let updatedFilteredData = [];
      let productPriceRangeData;

      if (inputValue > 1) {
        productPriceRangeData = data?.categories?.filter((p:any) => parseFloat(p?.price) < inputValue);
      } else {
        productPriceRangeData = data?.categories;
      }

      if (productPriceRangeData && productPriceRangeData?.length > -1) {
        updatedFilteredData = productPriceRangeData;
      } else {
        updatedFilteredData = data?.categories || [];
      }

      setFilteredData(updatedFilteredData);
    }
  }, [data?.categories, selectedCategories.length, inputValue]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Service List</h1>
      
      <ActionBar title="">
        <div className="flex gap-4 items-center">
          <Button 
            variant={toggleOrder ? "default" : "outline"}
            onClick={toggleSortOrder}
          >
            {toggleOrder ? "Ascending" : "Descending"}
          </Button>
          
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              variant="outline"
              size="icon"
              onClick={resetFilters}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </ActionBar>

      <div className="space-y-4 mb-8">
        <div className="flex flex-wrap gap-4">
          {uniqueCategoryNames?.map((categoryName, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${index}`}
                checked={selectedCategories.includes(categoryName)}
                onCheckedChange={() => handleCheckboxChange(categoryName)}
              />
              <Label htmlFor={`category-${index}`}>{categoryName}</Label>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8">
            <Slider
              min={0}
              max={maxPrice + 10}
              step={1}
              value={[inputValue]}
              onValueChange={onChange}
              className="w-full"
            />
          </div>
          <div className="md:col-span-4">
            <Input
              type="number"
              min={0}
              max={maxPrice + 10}
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData2
          .filter((categorydata: any) => {
            if (searchTerm === "") {
              return categorydata;
            } else if (
              categorydata.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              categorydata.location.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return categorydata;
            }
          })
          .map((categorydata: any ) => (
            <Link 
              key={categorydata?._id} 
              href={`customer/category/service/services/${categorydata?._id}`}
              className="block"
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="relative w-full h-[300px]">
                  <Image
                    alt={categorydata?.name}
                    src={categorydata?.profileImage}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <CardTitle className="mb-4">{categorydata?.name}</CardTitle>
                  <div className="space-y-2">
                    <p><span className="font-semibold">Price:</span> {categorydata?.price}</p>
                    <p><span className="font-semibold">Location:</span> {categorydata?.location}</p>
                    <p><span className="font-semibold">Details:</span> {categorydata?.details}</p>
                    <p><span className="font-semibold">Start Time:</span> {categorydata?.startTime}</p>
                    <p><span className="font-semibold">End Time:</span> {categorydata?.endTime}</p>
                    <p><span className="font-semibold">Appointment Days:</span> {categorydata?.apointmentdaysInWeek}</p>
                    <div>
                      <span className="font-semibold">Categories:</span>
                      {categorydata?.categoryIds?.map((c: any, i: any) => (
                        <span key={i} className="ml-2 inline-block bg-gray-100 rounded-full px-3 py-1 text-sm">
                          {c?.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-2xl">
                            {i < 4.5 ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ServicePage;