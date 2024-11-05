"use client";
import CategoryProducts from '../../components/category-product-manager';

export default function ChildPage({params}) {
  return <CategoryProducts categoryId={params.category} />;
}