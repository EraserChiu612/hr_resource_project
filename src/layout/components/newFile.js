import { mapGetters } from "vuex";

export default (await import('vue')).defineComponent({
components: {
Breadcrumb,
Hamburger,
},
data() {
return {
showDialog: false, //控制彈出層的顯示和隱藏
passForm: {
oldPassword: "",
newPassword: "",
confirmPassword: "", //確認密碼(前端需要)
},
rules: {
oldPassword: [{
required: true,
message: "請輸入舊密碼",
trigger: "blur"
}],
newPassword: [{
required: true,
message: "請輸入新密碼",
trigger: "blur"
}, {
min: 6,
max: 16,
message: "密碼長度須為 6 到 16 個字符",
trigger: "blur"
}],
confirmPassword: [{
required: true,
message: "請再次輸入新密碼",
trigger: "blur"
}, {
validator: (rule, value, callback) => {
if (value !== this.passForm.newPassword) {
callback(new Error("兩次輸入密碼不一致"));
} else {
callback();
}
},
trigger: "blur"
}]
},
};
},
computed: {
...mapGetters(["sidebar", "avatar", "name"]),
},
methods: {
updatePassword() {
//彈出層
this.showDialog = true;
},
toggleSideBar() {
this.$store.dispatch("app/toggleSideBar");
},
async logout() {
// 調用退出登陸的action
await this.$store.dispatch("user/logout");
this.$router.push("/login");
},
},
});
