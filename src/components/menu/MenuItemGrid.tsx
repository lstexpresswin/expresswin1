import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";

interface MenuItemGridProps {
  selectedCategory?: string;
}

interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const MenuItemGrid = ({ selectedCategory = "all" }: MenuItemGridProps) => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([
    {
      id: "1",
      name: "طبق كسكس تقليدي",
      description: "كسكس مغربي تقليدي مع لحم الضأن والخضروات الموسمية",
      price: 85,
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
      category: "main-dishes",
    },
    {
      id: "2",
      name: "طاجين لحم",
      description: "طاجين مغربي تقليدي مع لحم البقر والخضروات",
      price: 95,
      image:
        "https://images.unsplash.com/photo-1541518763669-27fef9a48765?w=600&q=80",
      category: "main-dishes",
    },
    {
      id: "3",
      name: "سلطة مغربية",
      description: "سلطة طازجة مع الطماطم والخيار والبصل والزيتون",
      price: 35,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
      category: "appetizers",
    },
    {
      id: "4",
      name: "بسطيلة",
      description: "فطيرة مغربية محشوة بالدجاج واللوز",
      price: 70,
      image:
        "https://images.unsplash.com/photo-1541518763669-27fef9a48765?w=600&q=80",
      category: "appetizers",
    },
    {
      id: "5",
      name: "حلوى مغربية",
      description: "تشكيلة من الحلويات المغربية التقليدية",
      price: 45,
      image:
        "https://images.unsplash.com/photo-1579372786545-d24232f7e0d1?w=600&q=80",
      category: "desserts",
    },
    {
      id: "6",
      name: "شاي بالنعناع",
      description: "شاي أخضر مغربي تقليدي مع النعناع الطازج",
      price: 15,
      image:
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=80",
      category: "beverages",
    },
    {
      id: "7",
      name: "عصير برتقال طازج",
      description: "عصير برتقال طازج 100%",
      price: 20,
      image:
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80",
      category: "beverages",
    },
    {
      id: "8",
      name: "مشاوي مشكلة",
      description: "تشكيلة من اللحوم المشوية مع الخضروات",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
      category: "meat",
    },
  ]);

  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>(menuItems);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(
        menuItems.filter((item) => item.category === selectedCategory),
      );
    }
  }, [selectedCategory, menuItems]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredItems.map((item) => (
        <MenuItem
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
          image={item.image}
        />
      ))}
    </div>
  );
};

export default MenuItemGrid;
