import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiousConfig from "../utils/axiousConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";


const Category=()=>{
      useUser();
      const[isLoading,setLoading]=useState(false);
      const[categoryData,setCategoryData]=useState([]);
      const [openAddCategoryModal,setOpenAddCategoryModal]=useState(false);
      const [openEditCategoryModal,setOpenEditCategoryModal]=useState(false);
      const [selectedCategory,setSelectedCategory]=useState(null);

      const fetchCategoryDetails=async()=>{
        if(isLoading) return;
        setLoading(true)
    try {
       const response= await axiousConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
       if(response.status==200){
        setCategoryData(response.data);
       }
    } catch (error) {
        console.error("Something went wrong. Please try again",error);
        toast.error(error.message);        
    }finally{
        setLoading(false);
    }
      }

      useEffect(()=>{
        fetchCategoryDetails();
      },[])

      const handleAddCategory=async(category)=>{
       const {name,type,icon}=category;
       if(!name.trim()){
        toast.error("Category name is required")
       }
       try {
            setLoading(true)
       const response= await axiousConfig.post(API_ENDPOINTS.ADD_CATEGORY,{name,type,icon});
      if(response.status===201){
       toast.success("Category added succxessfully");
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }  
    } catch (error) {
        console.error("Error adding category",error);
        toast.error(error.response?.data?.message||"Failed to add category")
       }finally{
            setLoading(false)
       }
      }

      const handleEditCategory=(category)=>{
        setSelectedCategory(category) 
        setOpenEditCategoryModal(true);
      }

      const handleUpdateCategory=async(category)=>{
        const {id,name,type,icon}=category;
        if(!name.trim()){
          toast.error("Category name is required");
          return;
        }
        if(!id){
        toast.error("Category Id is missing for update");
          return;
        }
        try {
          setLoading(true)
          const response=await axiousConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id),{name,icon,type})
          if(response.status==200){
          setOpenEditCategoryModal(false)
          setSelectedCategory(null)
          fetchCategoryDetails()
          toast.success("Category updated successfully");
          }
        } catch (error) {
          console.error("Error updating category:",error.response?.data?.message||error.message);
          toast.error("Error updating category:",error.response?.data?.message||"Failed to update the category");

        }finally{
          setLoading(false)
        }
      }


    return(<Dashboard activeMenu={"Category"}>
    <div className="my-5 mx-auto p-2">
<div className="flex justify-between items-center mb-5">
    <h2 className="text-2xl font-semibold">All Categories</h2>
    <button className="btn-add flex items-center gap-1" onClick={()=>setOpenAddCategoryModal(true)}>
        <Plus size={15}/>
        Add Category
    </button>
</div>
{/* Category list */}
<CategoryList categories={categoryData} onEditCategory={(category)=>handleEditCategory(category)}></CategoryList>


<Modal title="Add Category" isOpen={openAddCategoryModal} onClose={()=>setOpenAddCategoryModal(false)}>
    <AddCategoryForm onAddCategory={(category)=>handleAddCategory(category)} isLoading={isLoading}></AddCategoryForm>
</Modal>

<Modal title="Update Category" isOpen={openEditCategoryModal} onClose={()=>{
    setOpenEditCategoryModal(false)
    setSelectedCategory(null)
    }}>
    <AddCategoryForm onAddCategory={(category)=>handleUpdateCategory(category)} isLoading={isLoading} isEditing={true} initialCategoryData={selectedCategory}></AddCategoryForm>
</Modal>

    </div>
    </Dashboard>);
}

export default Category;