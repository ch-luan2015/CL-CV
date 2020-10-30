<BlogMetaDecorator folder="chap1GioiThieuHook" image="chap1.png" imageAlt="ReactHook" description="Như anh em cũng biết lập trình xưa giờ mọi người đều thích OOP, class và đa phần code cơ bản đều dạy về OOP đầu tiên. React cũng như thế! 
Nhưng có class thì cũng có function, có thiện có ác, có ngày thì có đêm. Function tuy là một trường phái khác và chỉ có thể sống lây lất qua ngày dưới cái bóng của OOP thì nay đã trỗi dậy..." title="CL - ReactHook" />

![ReactHook.png](https://images.viblo.asia/d1503bf1-3ca9-4e24-9464-4a9e538b73e4.png)

# Vì sao hook xuất hiện ?

Như anh em cũng biết lập trình xưa giờ mọi người đều thích OOP, class và đa phần code cơ bản đều dạy về OOP đầu tiên. React cũng như thế! Nhưng có class thì cũng có function, có thiện có ác, có ngày thì có đêm. Function tuy là một trường phái khác và chỉ có thể sống lây lất qua ngày dưới cái bóng của OOP thì nay đã trỗi dậy, như mặt trời chân lý chói qua tim.

![troll.png](https://i.pinimg.com/564x/99/40/77/9940774d8cee5db0e7c5309d26838f3e.jpg)

# Hook ra đời để giải quyết một số vấn đề hay gặp của OOP. Vậy nó giải quyết gì ?

1. Cho phép xài lại logic mà không thay đổi cấu trúc component.
2. Class khi phình to khó quản lý với một đống lifecycle: componentDidMount, componentDidUpdate, componentWillUnmount, ... đủ thứ hầm bà lằng và thêm một đám sideEffect nữa. Khó chia nhỏ vì logic nằm cùng một file => Dễ bug gây crash app.
3. Class ba gai, khó tiếp cận đối với người mới, gây bối rối : this, constructer, super, bind các event handler nếu không sẽ không chạy, .... quá nhiều.
4. Đặc biệt còn là cứu cánh của các bạn trái ngành muốn tự học, không ai chỉ, không được tiếp cận OOP một cách bài bản từ ghế nhà trường.

# Vậy chằng lẽ viết lại toàn bộ code của project ?

Không, nói vậy thôi chứ cái nào cũng có điểm tốt, chúng ta xài 2 cái luôn. Đi trên đường thấy tờ 5k với tờ 10k bạn lấy tờ nào? Mình là mình lấy cả 2 luôn, được 15k cà phê sữa. ^^

Chiến thuật ở đây là code cũ là class vẫn để đó , chúng ta tiếp cận và dùng hook ở những component mới, tích hợp từ từ vào, web hay app vẫn chạy như thường. Không cần ngồi cả đêm viết lại.

Bài này chỉ giới thiệu chút thôi , bài sau mình viết giới thiệu mấy cái hook hay xài chi tiết hơn xíu nhe. Thân ái các đồng ... âm.