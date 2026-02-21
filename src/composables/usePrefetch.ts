import { ref } from 'vue';

export function usePrefetch() {
    const isPrefetching = ref(false);
    const prefetchedAssets = new Set<string>();

    const prefetchComponent = (importFn: () => Promise<unknown>) => {
        importFn();
    };

    const prefetchImages = (urls: string[]) => {
        urls.forEach((url) => {
            if (prefetchedAssets.has(url)) return;

            const img = new Image();
            img.src = url;
            prefetchedAssets.add(url);
        });
    };

    return {
        isPrefetching,
        prefetchComponent,
        prefetchImages,
    };
}
