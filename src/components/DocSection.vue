<template>
    <div v-if="$store.state.userDocs" class="flex flex-col">
        <div class="overflow-x-auto bg-white sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <thead class="border-b">
                            <tr>
                                <th
                                    scope="col"
                                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                >
                                    #
                                </th>
                                <th
                                    scope="col"
                                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                >
                                    Hash
                                </th>
                                <th
                                    scope="col"
                                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                >
                                    Date Added
                                </th>
                                <th
                                    scope="col"
                                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                >
                                    Preview
                                </th>
                                <th
                                    scope="col"
                                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                >
                                    Download
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                class="border-b"
                                v-for="(d, i) in $store.state.userDocs"
                                :key="i"
                            >
                                <td
                                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                >
                                    {{ i + 1 }}
                                </td>
                                <a
                                    class="px-6 py-4 whitespace-nowrap cursor-pointer text-sm font-medium text-indigo-900"
                                    @click.prevent="
                                        showOnIPFS(hashToCID(d.docHash))
                                    "
                                >
                                    {{ truncateHash(hashToCID(d.docHash)) }}
                                </a>
                                <td
                                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                >
                                    {{ getValidDate(d.timeNotarized) }}
                                </td>
                                <td
                                    class="text-sm text-indigo-500 font-light px-4 py-4 whitespace-nowrap"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512"
                                        class="cursor-pointer w-4 h-4"
                                        role="img"
                                        @click.prevent="
                                            previewDoc(hashToCID(d.docHash))
                                        "
                                    >
                                        <path
                                            d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                                        />
                                    </svg>
                                </td>
                                <td
                                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        class="cursor-pointer w-4 h-4"
                                        role="img"
                                        @click="
                                            downloadDoc(hashToCID(d.docHash))
                                        "
                                    >
                                        <path
                                            d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                        />
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
    name: "DocSection",
    props: ["docData"],
    setup(props) {
        const store = useStore();
        const data = ref(null);

        onBeforeMount(async () => {
            data.value = await props.docData;
            console.log(data.value);
        });

        const hashToCID = (x) => store.state.web3.utils.hexToAscii(x);

        const truncateHash = (x) =>
            `${x.substring(0, 7)}...${x.substring(x.length - 4)}`;

        // const getDocFromHash = async (x) => {
        //     const y = client.cat(x);
        //     console.log(y);
        // };

        // const getDocs = async (t) => {
        //     const a = t.map(async (x) => {
        //         await getDocFromHash(x);
        //     });
        //     console.log(a);
        //     console.log(await Promise.all(a));
        // };
        const showOnIPFS = (x) =>
            window.open(`https://ipfs.io/ipfs/${x}`, "_blank");

        const getValidDate = (c) => {
            const d = new Date(c * 1000);
            const day = d.getDate();
            const month = d.getMonth() + 1;
            const year = d.getFullYear();
            const h = d.getHours();
            const m = d.getMinutes();
            const s = d.getSeconds();
            return `${day}-${month}-${year} ${h}:${m}:${s}`;
        };

        const previewDoc = async (x) => {
            const r = await fetch(`https://ipfs.io/ipfs/${x}`).then((res) =>
                res.json()
            );
            var win = window.open();
            win.document.write(
                '<iframe src="' +
                    r.file +
                    '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
            );
        };

        const downloadDoc = async (x) => {
            const r = await fetch(`https://ipfs.io/ipfs/${x}`).then((res) =>
                res.json()
            );
            let link = document.createElement("a");
            link.download = r.name;
            link.href = r.file;
            link.click();
        };

        return {
            data,
            hashToCID,
            truncateHash,
            showOnIPFS,
            getValidDate,
            previewDoc,
            downloadDoc,
        };
    },
};
</script>

<style></style>
