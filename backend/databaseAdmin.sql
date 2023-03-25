SELECT * FROM rsn_admin /*GET ALL ADMINS*/

ALTER SEQUENCE rsn_admin_adid_seq RESTART WITH 1 --RESET AUTO_INCREMENT

SELECT * FROM rsn_admin WHERE email = 'bachvo01@gmail.com'     --SELECT admin with desired email
                        AND EXISTS (SELECT 1 FROM rsn_admin 
                        WHERE email = 'bachvo01@gmail.com')

SELECT * FROM rsn_product

CREATE TABLE rsn_product(
	productID SERIAL PRIMARY KEY,
	title varchar(256),
	genre varchar(256),
	price DECIMAL(10,2),
	developer varchar(256),
	date varchar(256),
	descriptions VARCHAR,
	fileCover1 varchar(256),
	fileCover2 varchar(256),
	fileBanner varchar(256),
	fileImg1 varchar(256),
	fileImg2 varchar(256),
	fileImg3 varchar(256),
	fileImg4 varchar(256)
)




