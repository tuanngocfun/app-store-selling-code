SELECT * FROM rsn_admin /*GET ALL ADMINS*/

ALTER SEQUENCE rsn_admin_adid_seq RESTART WITH 1 --RESET AUTO_INCREMENT

SELECT * FROM rsn_admin WHERE email = 'bachvo01@gmail.com'
                        AND EXISTS (SELECT 1 FROM rsn_admin 
                        WHERE email = 'bachvo01@gmail.com')


