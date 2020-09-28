## Markdown Là Gì

Markdown **(.md)** là ngôn ngữ đánh dấu văn bản được tạo ra bởi John Gruber. Markdown sử dụng cú pháp khá đơn giản và dễ hiểu để đánh dấu văn bản và văn bản được viết bằng Markdown sẽ có thể được chuyển đổi sang HTML. Ngược lại các văn bản được viết bằng HTML cũng có thể được chuyển đổi sang Markdown. Thường md được sử dụng nhiều trong tài liệu document cho dev, code.

## Tại Sao Cần Dùng Markdown? :

Nó đơn giản, nhẹ và thân thiện hơn với người dùng nếu người đó không có kiến thức về HTML
Ví dụ nhe :

<h3>Tiêu đề viết bằng HTML : </h3>
<p>Đoạn văn thứ 1</p>
<p>Đoạn văn thứ 2</p>
<p>Đoạn văn thứ 3</p>

### Tiêu đề viết bằng MarkDown :

Đoạn văn thứ 1

Đoạn văn thứ 2

Đoạn văn thứ 3

Rõ ràng anh em thấy được cách viết thứ 2 ngắn gọn và dễ hiểu hơn rất nhiều so với cách viết đầu tiên dùng HTML.
Mình dùng đang phần mềm Joplin chuyên viết markdown , như ae thấy bên trái là editor dùng mark down , bên phải là text sẽ hiện trên web.
![Screen Shot 2020-09-28 at 01.02.37.png](:/49a830d66ed84d8e8be05f633e1739a9)

## Một số cú pháp phổ biến để sử dụng MD :

**1. Heading :**
Dùng dấu # , bao nhiêu dấu # tương đương h1, h2, h3,..., h6 bên HTML.
VD:

```
# Heading1
```

```
## Heading2
```

---

**2. In đậm và in nghiêng : italic và bold:**
Chữ **in đậm** , **in đậm 2** và chữ _in nghiêng_ , _in nghiêng 2_ , **_vừa in nghiêng vừa bôi đậm_** và ~~chữ gạch ngang~~

```
Chữ **in đậm** , __in đậm 2__ và chữ *in nghiêng* , _in nghiêng 2_ , ***vừa in nghiêng vừa bôi đậm*** và ~~chữ gạch ngang~~
```

---

**3. Một danh sách không thứ tự như todo list :**

- Xe đạp
- Xe hơi
- Xe gắn máy

```
- Xe đạp
- Xe hơi
- Xe gắn máy
```

---

**4. Một danh sách có thứ tự:**

    1.  Xe đạp
    2.  Xe hơi
    3.  Xe gắn máy

```
1. Xe đạp
2. Xe hơi
3. Xe gắn máy
```

---

**5. Đánh dấu hình ảnh:**

```
![alt](http://~)
```

- Ảnh save tại local hay tại máy tính :
  ![ReactHook.png](:/ae76c45e44644e3bbbfe9088740e4310)

```
![ReactHook.png](:/ae76c45e44644e3bbbfe9088740e4310)
```

- Ảnh ở trên internet với đường dẫn url :
  ![Mình không thể nói đây là Yua Mikami và Asuka Kirara](https://gamek.mediacdn.vn/133514250583805952/2020/9/11/photo-3-1599818427409945693895.jpeg)

  ```
  ![Mình không thể nói đây là Yua Mikami và Asuka Kirara](https://gamek.mediacdn.vn/133514250583805952/2020/9/11/photo-3-1599818427409945693895.jpeg)
  ```

Gần tương tự như khi đánh dấu hình ảnh, với cách đánh dấu sử dụng ngôn ngữ Markdown như trên thì đoạn văn bản bên trong `[]` sẽ tương đương với giá trị của thuộc tính title trong thẻ `<a>` Html và liên kết đặt trong `()` sẽ tương đương với đường dẫn href trong thẻ `<a>`.

---

**6. Chèn link đường dẫn:**

[title](http://~)

```
[title](http://~)
```

[Markdown](http://https://vi.wikipedia.org/wiki/Markdown)

```
[Markdown](http://https://vi.wikipedia.org/wiki/Markdown)
```

---

**7. Code block inline :**
Để viết `inline code` :

```
`inlide code`
```

Để highlight block code :

````
    ```html
    <p>Đây là paragraph html</p>

	```
````

```html
<p>Đây là paragraph html</p>
```

---

**8. Kẻ ngang :**

---

horizonal rules

```
***
horizonal rules
```

---

**9. Blockquotes:**

> Blockquotes

```
> Blockquotes

```

Lồng nhau: >>

> Quantrimang.com là mạng xã hội dành cho những tín đồ công nghệ.
>
> > Bạn có thể chia sẻ bài viết của mình trên trang nếu có tài khoản.
> >
> > > Bạn nên đăng ký một tài khoản .

```
> Quantrimang.com là mạng xã hội dành cho những tín đồ công nghệ.
>
>> Bạn có thể chia sẻ bài viết của mình trên trang nếu có tài khoản.
>>> Bạn nên đăng ký một tài khoản .
```

---

**10. Đôi khi viết sẽ có kí hiệu \* , > ,.. trùng với ký hiệu markdown vậy làm sao viết được :**
Thêm dấu \ vào đầu dòng

\*text\*

```
\*text*
```

---

**10. CheckList :**

### Hệ mặt trời

- [ ] Mercury
- [ ] Venus
- [x] Earth (Orbit/Moon)
- [x] Mars
- [ ] Jupiter

---

**12. Table:**

| Tables     |    Are    |   Cool |
| ---------- | :-------: | -----: |
| cột 3 là   | canh phải | \$1600 |
| cột 2 là   | canh giữa |   \$12 |
| cột một là | canh trái |    \$1 |

```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| cột 3 là      | canh phải     | $1600 |
| cột 2 là      | canh giữa     |   $12 |
| cột một là    | canh trái     |    $1 |
```

Bài dài rồi, tạm dừng ở đây nhe, cảm ơn anh em đã theo dõi.
