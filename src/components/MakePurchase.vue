<template>
    <div style="display: flex; justify-content: center; padding: 15px">
        <iframe
            style="
                --border-radius: 10px;
                box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
                border-radius: var(--border-radius);
                margin: auto;
                max-width: 420px;
            "
            src="https://widget.onramper.com?color=266677&apiKey=pk_test_x5M_5fdXzn1fxK04seu0JgFjGsu7CH8lOvS9xZWzuSM0"
            height="400px"
            width="482px"
            title="Onramper widget"
            frameborder="0"
            id="onrampWidget"
            allow="accelerometer; autoplay; camera; gyroscope; payment"
        >
        </iframe>
    </div>
</template>

<script>
import { onMounted } from "vue";
export default {
    name: "MakePurchase",
    setup() {
        onMounted(() => {
            document.querySelector(
                "#onrampWidget"
            ).src = `https://widget.onramper.com?color=266677&apiKey=${process.env.VUE_APP_ONRAMP_API_KEY}`;
        });
    },
};
</script>

<style></style>
