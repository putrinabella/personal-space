"use client";

import { useState } from "react";
import CardHeader from "@/shared/components/CardHeader";
import CardSection from "@/shared/components/CardSection";
import Pagination from "@/shared/components/Pagination";
import { useCategoriesList } from "@/features/food/categories/hooks/useCategoriesList";
import { useCuisinesList } from "@/features/food/cuisines/hooks/useCuisinesList";
import { Sliders, List, Plus } from "lucide-react";
import DataRenderer from "@/shared/components/DataRender";
import ActionButton from "@/shared/components/ActionButton";
import { SquaresFour } from "@phosphor-icons/react";
import { useTagsList } from "@/features/food/tags/hooks/useTagList";
import { useDiningTypeList } from "@/features/food/diningType/hooks/useDiningTypeList";
import { useRouter } from "next/navigation";
import { useCategoriesDelete } from "@/features/food/categories/hooks/useCategoriesDelete";
import { useCuisinesDelete } from "@/features/food/cuisines/hooks/useCuisinesDelete";
import { useDiningTypeDelete } from "@/features/food/diningType/hooks/useDiningTypeDelete";
import { useTagDelete } from "@/features/food/tags/hooks/useTagDelete";
import DataSection from "@/shared/components/DataSection";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <CardHeader title="S E T T I N G S" icon={Sliders} color="accent" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <CardSection
              title="Data Management"
              headerColor="primary"
              rounded="3xl"
            >
              {/* {renderNavButtons()} */}
            </CardSection>

            <CardSection
              title="View Options"
              headerColor="primary"
              // variant="normal"
            ></CardSection>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex flex-col gap-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus accusantium dolorum dolorem ab explicabo
            exercitationem ut molestiae voluptatem voluptas error consequuntur,
            accusamus unde earum recusandae veritatis illum voluptatum nam in?
          </div>
        </div>
      </div>
    </div>
  );
}
