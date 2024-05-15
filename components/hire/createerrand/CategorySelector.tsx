'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { CategorySelectorProps } from './types';

const categorySubcategoryMap = {
    "Училище": [
        "изготвяне на домашни",
        "изготвяне на есета",
        "изготвяне на презентации",
        "изготвяне на проекти",
        "изготвяне на дипломни работи",
        "изготвяне на доклади",
        "изготвяне на преговорни материали",
        "допълнителни уроци по опр предмет: БЕЛ",
        "допълнителни уроци по опр предмет: Математика",
        "допълнителни уроци по опр предмет: Немски език",
        "допълнителни уроци по опр предмет: Английски език",
        "допълнителни уроци по опр предмет: Испански език",
        "допълнителни уроци по опр предмет: Френски език",
        "допълнителни уроци по опр предмет: Италиански език",
        "допълнителни уроци по опр предмет: Руски език",
        "допълнителни уроци по опр предмет: Химия",
        "допълнителни уроци по опр предмет: Биология",
        "допълнителни уроци по опр предмет: История",
        "допълнителни уроци по опр предмет: География",
        "допълнителни уроци по опр предмет: Физика",
        "допълнителни уроци по опр предмет: Философия",
        "допълнителни уроци по опр предмет: Музика",
        "допълнителни уроци по опр предмет: Изобразително изкуство",
    ],
    "Грижа за деца": [
        "вземане на дете от училище/детска градина",
        "почасова грижа за дете",
    ],
    "Дом и градина": [
        "почистване на апартамент",
        "почистване на къща",
        "ремонтни дейности: монтаж на мебели",
        "ремонтни дейности: ремонт на влажни помещения",
        "ремонтни дейности: боядисване",
        "ремонтни дейности: ремонт на врати и прозорци",
        "ремонтни дейности: монтаж/подмяна на санитарни и електрически уреди",
        "ремонтни дейности: ремонт на електрически инсталации",
        "ремонтни дейности: ремонт на покрив",
        "ремонтни дейности: обновяване на фасада",
        "ремонтни дейности: обновяване на външни пространства",
        "ремонтни дейности: ремонт на отоплителни системи",
        "ремонтни дейности: ремонт на балкони и тераси",
        "почистване на градина",
        "поддръжка на градина: косене на трева",
        "поддръжка на градина: подрязване на храсти",
        "поддръжка на градина: поливане на растения",
        "поддръжка на градина: засаждане на растения",
        "поддръжка на градина: поддръжка на системи за поливане",
        "поддръжка на градина: поддръжка на системи за осветление",
        "поддръжка на градина: изграждане на градински пътеки, площадки и др.",
    ],
    "Пазар": [
        "Пазаруване по списък от конкретен магазин",
        "Връщане/ замяна на стоки в магазините",
        "Доставки: взимане на пратки от офис и доставка до адрес",
        "Доставки: доставки от т.А до т.Б: на хранителни стоки",
        "Доставки: доставки от т.А до т.Б: на пратки",
        "Доставки: доставки от т.А до т.Б: на дрехи и обувки",
        "Доставки: доставки от т.А до т.Б: на рециклируеми материали",
        "Доставки: доставки от т.А до т.Б: на електроника",
        "Доставки: доставки от т.А до т.Б: на козметика",
        "Доставки: доставки от т.А до т.Б: на цветя и подаръци",
        "Доставки: доставки от т.А до т.Б: на домакински стоки",
        "Доставки: доставки от т.А до т.Б: на аптекарски стоки",
        "Доставки: доставки от т.А до т.Б: на гориво",
    ],
    "Козметика и разкрасяване": [
        "маникюр",
        "педикюр",
        "масаж",
        "грижа за кожата",
        "причесване на коса",
        "грим: ежедневен",
        "грим: вечерен",
        "грим: специален",
        "боядисване на коса",
    ],
    "Социални мрежи и медии": [
        "създаване на съдържание за социалните мрежи",
        "реклама на продукти, услуги",
        "реклама на събития",
    ],
    "Техника и електроника": [
        "ремонт на електроника: смартфони и таблети",
        "ремонт на електроника: компютри и ламтопи",
        "ремонт на електроника: телевизори",
        "ремонт на електроника: аудио и видео уреди",
        "ремонт на електроника: игрови конзоли",
        "инсталация на софтуер и операционни системи",
        "настройка на мрежови устройства (рутери, мрежови комутатори, принтери и др.)",
        "консултации по технически въпроси",
        "управление на IT-инфраструктура (сървъри, бази данни, облачни услуги и др.)",
        "сигурност на данните: инсталиране и конфигуриране на антивирусни програми",
        "сигурност на данните: защита от злонамерени атаки",
        "сигурност на данните: резервно копиране на данни",
        "курсове по програмиране",
        "курсове по уеб дизайн и разработка",
        "курсове по цифрова графика",
    ],
    "Планиране и организация на събития": [
        "рождени дни",
        "сватби",
        "празненства",
        "концерти",
        "благотворителни кампании",
        "състезания",
        "семинари",
        "конференции",
    ],
    "Планиране и организация на пътувания и ваканции": [
        "в България",
        "в Европа",
        "в Северна Америка",
        "в Южна Америка",
        "в Азия",
        "в Австралия",
        "в Африка",
    ],
    "съставяне на личен график": [
        "съставяне на личен режим на хранене",
        "съставяне на личен фитнес режим",
    ],
    "Помощ с идеи": [
        "за подаръци",
        "за събития",
        "за места, които да посетите: в София",
        "за места, които да посетите: в България",
        "за места, които да посетите: в чужбина",
    ],
    "Кулинария": [
        "приготвяне на основни ястия",
        "приготвяне на печива: хляб",
        "приготвяне на печива: тестени изделия",
        "приготвяне на печива: десерти",
        "онлайн кулинарни уроци",
        "готвене по специална диета",
    ],
    "За домашния любимец": [
        "Хранене на домашен любимец",
        "почистване на мястото, където живее домашния любимец",
        "Баня и грижа за домашния любимец",
        "посещения при ветеринарен лекар",
        "разхождане на куче",
        "грижа за домашен любимец за няколко дни",
    ],
    "За превозните средства": [
        "почистване на автомобил",
        "почистване на мотоциклет",
    ],
};
//@ts-ignore
const CategorySelector: React.FC<CategorySelectorProps> = ({ onCategoryChange, initialCategory = '', initialSubCategory = '' }) => {
    const [category, setCategory] = useState<string>(initialCategory);
    const [subcategories, setSubcategories] = useState<string[]>([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialSubCategory);

    useEffect(() => {
        if (initialCategory) {
            //@ts-ignore
            const selectedSubcategories = categorySubcategoryMap[initialCategory] || [];
            setSubcategories(selectedSubcategories);
        }
    }, [initialCategory]);

    useEffect(() => {
        if (initialSubCategory) {
            setSelectedSubcategory(initialSubCategory);
        }
    }, [initialSubCategory]);

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        //@ts-ignore
        const selectedSubcategories = categorySubcategoryMap[selectedCategory] || [];
        setSubcategories(selectedSubcategories);
        const firstSubcategory = selectedSubcategories[0] || '';
        setSelectedSubcategory(firstSubcategory);
        onCategoryChange(selectedCategory, firstSubcategory);
    };

    const handleSubcategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const subcategory = event.target.value;
        setSelectedSubcategory(subcategory);
        //@ts-ignore
        onCategoryChange(category, subcategory);
    };

    return (
        <>
            <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Категория</label>
                <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                    <option value="" disabled>Избери категория</option>
                    {Object.keys(categorySubcategoryMap).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            {category && (
                <div>
                    <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Подкатегория</label>
                    <select
                        id="subcategory"
                        value={selectedSubcategory}
                        onChange={handleSubcategoryChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                        <option value="" disabled>Избери субкатегория</option>
                        {subcategories.map((subcat) => (
                            <option key={subcat} value={subcat}>{subcat}</option>
                        ))}
                    </select>
                </div>
            )}
        </>
    );
};

export default CategorySelector;
