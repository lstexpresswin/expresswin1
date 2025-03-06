-- MySQL Database Schema for Food Ordering App with Loyalty System

-- Create the database
CREATE DATABASE IF NOT EXISTS food_ordering_app;
USE food_ordering_app;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    pin VARCHAR(255) NOT NULL,  -- Hashed PIN
    name VARCHAR(100),
    email VARCHAR(100),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Admin users table
CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- Hashed password
    name VARCHAR(100),
    role ENUM('admin', 'manager', 'staff') DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Categories table
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Menu items table
CREATE TABLE menu_items (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    coins_price INT,
    image_url VARCHAR(255),
    category_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Item sizes table
CREATE TABLE item_sizes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id VARCHAR(50) NOT NULL,
    size_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- Item ingredients table
CREATE TABLE item_ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id VARCHAR(50) NOT NULL,
    ingredient_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- Item addons table
CREATE TABLE item_addons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id VARCHAR(50) NOT NULL,
    addon_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    FOREIGN KEY (item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- Orders table
CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('new', 'preparing', 'delivering', 'delivered', 'cancelled') DEFAULT 'new',
    payment_method ENUM('cash', 'card', 'coins', 'mixed') DEFAULT 'cash',
    coins_used INT DEFAULT 0,
    stamps_earned INT DEFAULT 0,
    delivery_address TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    preparing_time INT,  -- in minutes
    delivery_time INT,   -- in minutes
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order items table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    item_id VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    size VARCHAR(50),
    notes TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES menu_items(id)
);

-- Order item addons table
CREATE TABLE order_item_addons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_item_id INT NOT NULL,
    addon_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE
);

-- Loyalty cards table
CREATE TABLE loyalty_cards (
    id VARCHAR(20) PRIMARY KEY,  -- 7-digit card number
    name VARCHAR(100) NOT NULL,
    description TEXT,
    max_stamps INT NOT NULL DEFAULT 7,
    reward TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- User loyalty cards table
CREATE TABLE user_loyalty_cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    card_id VARCHAR(20) NOT NULL,
    stamps INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (card_id) REFERENCES loyalty_cards(id) ON DELETE CASCADE,
    UNIQUE KEY (user_id, card_id)
);

-- Stamps history table
CREATE TABLE stamps_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    card_id VARCHAR(20) NOT NULL,
    stamps_added INT NOT NULL,
    order_id VARCHAR(50),
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (card_id) REFERENCES loyalty_cards(id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);

-- Coins balance table
CREATE TABLE coins_balance (
    user_id INT PRIMARY KEY,
    balance INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Coins transactions table
CREATE TABLE coins_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount INT NOT NULL,  -- Positive for earned, negative for spent
    type ENUM('earned', 'spent', 'bonus', 'expired', 'adjustment') NOT NULL,
    order_id VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);

-- Quick gifts table
CREATE TABLE quick_gifts (
    id VARCHAR(20) PRIMARY KEY,  -- 5-digit gift code
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    type ENUM('discount', 'free-item', 'free-drink', 'free-dessert', 'custom') NOT NULL,
    value VARCHAR(50),  -- Could be a percentage or fixed amount
    expiry_date DATE NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive', 'used') DEFAULT 'active'
);

-- User gifts table
CREATE TABLE user_gifts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    gift_id VARCHAR(20) NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMP NULL,
    order_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (gift_id) REFERENCES quick_gifts(id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);

-- Insert demo data

-- Admin users
INSERT INTO admin_users (email, password, name, role) VALUES
('admin@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', 'admin'),
('manager@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Manager User', 'manager'),
('staff@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Staff User', 'staff');

-- Categories
INSERT INTO categories (id, name, description, image_url, icon) VALUES
('appetizers', 'المقبلات', 'مقبلات شهية ومتنوعة', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80', 'salad'),
('main-dishes', 'الأطباق الرئيسية', 'أطباق رئيسية تقليدية مغربية', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80', 'utensils'),
('sandwiches', 'السندويشات', 'سندويشات طازجة ولذيذة', 'https://images.unsplash.com/photo-1539252554935-80c8cabf1911?w=600&q=80', 'sandwich'),
('pizza', 'البيتزا', 'بيتزا طازجة بمكونات متنوعة', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', 'pizza'),
('meat', 'اللحوم', 'أطباق اللحوم الشهية', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80', 'beef'),
('desserts', 'الحلويات', 'حلويات مغربية تقليدية', 'https://images.unsplash.com/photo-1579372786545-d24232f7e0d1?w=600&q=80', 'cake'),
('ice-cream', 'المثلجات', 'مثلجات منعشة', 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&q=80', 'ice-cream'),
('beverages', 'المشروبات', 'مشروبات ساخنة وباردة', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=80', 'coffee');

-- Menu items
INSERT INTO menu_items (id, name, description, price, coins_price, image_url, category_id) VALUES
('1', 'طبق كسكس تقليدي', 'كسكس مغربي تقليدي مع لحم الضأن والخضروات الموسمية', 85.00, 850, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80', 'main-dishes'),
('2', 'طاجين لحم', 'طاجين مغربي تقليدي مع لحم البقر والخضروات', 95.00, 950, 'https://images.unsplash.com/photo-1541518763669-27fef9a48765?w=600&q=80', 'main-dishes'),
('3', 'سلطة مغربية', 'سلطة طازجة مع الطماطم والخيار والبصل والزيتون', 35.00, NULL, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80', 'appetizers'),
('4', 'بسطيلة', 'فطيرة مغربية محشوة بالدجاج واللوز', 70.00, 700, 'https://images.unsplash.com/photo-1541518763669-27fef9a48765?w=600&q=80', 'appetizers'),
('5', 'حلوى مغربية', 'تشكيلة من الحلويات المغربية التقليدية', 45.00, NULL, 'https://images.unsplash.com/photo-1579372786545-d24232f7e0d1?w=600&q=80', 'desserts'),
('6', 'شاي بالنعناع', 'شاي أخضر مغربي تقليدي مع النعناع الطازج', 15.00, NULL, 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=80', 'beverages'),
('7', 'عصير برتقال طازج', 'عصير برتقال طازج 100%', 20.00, NULL, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80', 'beverages'),
('8', 'مشاوي مشكلة', 'تشكيلة من اللحوم المشوية مع الخضروات', 120.00, 1200, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80', 'meat');

-- Item sizes
INSERT INTO item_sizes (item_id, size_name) VALUES
('1', 'صغير'), ('1', 'وسط'), ('1', 'كبير'),
('2', 'وسط'), ('2', 'كبير'),
('3', 'صغير'), ('3', 'كبير'),
('4', 'فردي'), ('4', 'عائلي'),
('5', 'صغير'), ('5', 'وسط'), ('5', 'كبير'),
('6', 'صغير'), ('6', 'وسط'), ('6', 'كبير'),
('7', 'صغير'), ('7', 'وسط'), ('7', 'كبير'),
('8', 'فردي'), ('8', 'عائلي');

-- Item ingredients
INSERT INTO item_ingredients (item_id, ingredient_name) VALUES
('1', 'لحم الضأن'), ('1', 'الجزر'), ('1', 'البصل'), ('1', 'الكوسة'), ('1', 'الحمص'),
('2', 'لحم البقر'), ('2', 'البصل'), ('2', 'الطماطم'), ('2', 'الزيتون'),
('3', 'طماطم'), ('3', 'خيار'), ('3', 'بصل'), ('3', 'زيتون'), ('3', 'زيت زيتون'),
('4', 'دجاج'), ('4', 'لوز'), ('4', 'بيض'), ('4', 'بهارات'), ('4', 'سكر'), ('4', 'قرفة'),
('5', 'لوز'), ('5', 'عسل'), ('5', 'سكر'), ('5', 'قرفة'), ('5', 'ماء زهر'),
('6', 'شاي أخضر'), ('6', 'نعناع طازج'), ('6', 'سكر'),
('7', 'برتقال طازج'),
('8', 'لحم ضأن'), ('8', 'لحم بقر'), ('8', 'دجاج'), ('8', 'خضروات مشوية'), ('8', 'أرز');

-- Item addons
INSERT INTO item_addons (item_id, addon_name, price) VALUES
('1', 'لحم إضافي', 25.00), ('1', 'خضروات إضافية', 10.00),
('2', 'لحم إضافي', 30.00), ('2', 'صلصة إضافية', 5.00),
('3', 'جبنة فيتا', 10.00), ('3', 'أفوكادو', 15.00),
('4', 'لوز إضافي', 15.00), ('4', 'عسل', 5.00),
('5', 'عسل إضافي', 5.00), ('5', 'مكسرات إضافية', 10.00),
('6', 'نعناع إضافي', 0.00), ('6', 'عسل', 5.00),
('7', 'نعناع', 0.00), ('7', 'ثلج', 0.00),
('8', 'صلصة حارة', 5.00), ('8', 'خبز', 3.00);

-- Loyalty cards
INSERT INTO loyalty_cards (id, name, description, max_stamps, reward) VALUES
('1234567', 'بطاقة الوجبات الرئيسية', 'عميل منتظم - يفضل الأطباق التقليدية', 7, 'وجبة رئيسية مجانية'),
('7654321', 'بطاقة المشروبات', 'تفضل المشروبات الساخنة', 5, 'مشروب مجاني'),
('9876543', 'بطاقة الحلويات', '', 6, 'حلوى مجانية'),
('1357924', 'بطاقة البيتزا', 'للعملاء الجدد', 8, 'بيتزا مجانية');

-- Quick gifts
INSERT INTO quick_gifts (id, name, description, type, value, expiry_date, image_url, status) VALUES
('12345', 'مشروب مجاني', 'احصل على أي مشروب مجاني مع طلبك التالي', 'free-drink', '15', '2023-12-31', 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80', 'active'),
('54321', 'خصم 10%', 'احصل على خصم 10% على طلبك التالي', 'discount', '10%', '2023-11-30', 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80', 'active'),
('98765', 'حلوى مجانية', 'احصل على حلوى مجانية مع طلبك التالي', 'free-dessert', '25', '2023-12-15', 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80', 'active'),
('13579', 'وجبة مجانية', 'احصل على وجبة رئيسية مجانية', 'free-item', '85', '2023-12-20', 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80', 'inactive'),
('24680', 'خصم 25%', 'احصل على خصم 25% على طلبك التالي بقيمة 200 درهم أو أكثر', 'discount', '25%', '2023-12-25', 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=600&q=80', 'active'),
('11223', 'طبق جانبي مجاني', 'احصل على طبق جانبي مجاني مع أي وجبة رئيسية', 'free-item', '35', '2023-12-31', 'https://images.unsplash.com/photo-1594834749740-74b3f6764be4?w=600&q=80', 'inactive');

-- Demo users
INSERT INTO users (phone_number, pin, name, address) VALUES
('0612345678', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'محمد أحمد', 'شارع الحسن الثاني، الدار البيضاء'),
('0612345679', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'فاطمة علي', 'شارع محمد الخامس، الرباط'),
('0612345680', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'أحمد محمود', 'شارع الزرقطوني، الدار البيضاء');

-- User loyalty cards
INSERT INTO user_loyalty_cards (user_id, card_id, stamps) VALUES
(1, '1234567', 5),
(2, '7654321', 3),
(3, '9876543', 2);

-- Coins balance
INSERT INTO coins_balance (user_id, balance) VALUES
(1, 120),
(2, 75),
(3, 200);

-- User gifts
INSERT INTO user_gifts (user_id, gift_id, is_used) VALUES
(1, '12345', 0),
(2, '54321', 0),
(3, '98765', 1);

-- Demo orders
INSERT INTO orders (id, user_id, total_amount, status, payment_method, coins_used, stamps_earned, delivery_address, notes, preparing_time, delivery_time) VALUES
('#ORD12345', 1, 200.00, 'delivered', 'cash', 0, 1, 'شارع الحسن الثاني، الدار البيضاء', 'الرجاء الاتصال قبل التوصيل', 12, 25),
('#ORD12346', 2, 130.00, 'delivered', 'cash', 0, 1, 'شارع محمد الخامس، الرباط', '', 15, 20),
('#ORD12347', 3, 115.00, 'cancelled', 'cash', 0, 0, 'شارع الزرقطوني، الدار البيضاء', 'الطابق الثالث، الشقة 8', 5, 0),
('#ORD12348', 1, 160.00, 'delivered', 'mixed', 50, 1, 'شارع الحسن الثاني، الدار البيضاء', '', 10, 30),
('#ORD12349', 2, 170.00, 'delivered', 'cash', 0, 1, 'شارع محمد الخامس، الرباط', '', 8, 22);

-- Order items
INSERT INTO order_items (order_id, item_id, quantity, price, size) VALUES
('#ORD12345', '1', 2, 85.00, 'وسط'),
('#ORD12345', '6', 2, 15.00, 'وسط'),
('#ORD12346', '2', 1, 95.00, 'كبير'),
('#ORD12346', '3', 1, 35.00, 'كبير'),
('#ORD12347', '4', 1, 70.00, 'فردي'),
('#ORD12347', '5', 1, 45.00, 'وسط'),
('#ORD12348', '8', 1, 120.00, 'فردي'),
('#ORD12348', '7', 2, 20.00, 'كبير'),
('#ORD12349', '1', 2, 85.00, 'وسط');

-- Order item addons
INSERT INTO order_item_addons (order_item_id, addon_name, price) VALUES
(1, 'لحم إضافي', 25.00),
(3, 'صلصة إضافية', 5.00),
(5, 'لوز إضافي', 15.00),
(7, 'صلصة حارة', 5.00),
(9, 'خضروات إضافية', 10.00);
