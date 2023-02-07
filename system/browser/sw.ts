import "https://esm.sh/workbox-sw@6.5.4";

interface Options {
  debug?: boolean;
  cacheName: string;
  cacheFirstFileTypes: string[];
  networkFirstFileTypes: string[];
}

export default function sw({
  debug = false,
  cacheName = "assets_cache",
  cacheFirstFileTypes = ["png", "jpg", "jpeg", "svg", "gif"],
  networkFirstFileTypes = ["js", "css"],
}: Options, configure?: (sw: typeof workbox) => void) {
  workbox.setConfig({ debug });

  const networkFileTypes = networkFirstFileTypes.join("|");
  workbox.routing.registerRoute(
    new RegExp(`.*\\.(?:${networkFileTypes})`),
    new workbox.strategies.NetworkFirst(),
  );

  const cacheFileTypes = cacheFirstFileTypes.join("|");
  workbox.routing.registerRoute(
    new RegExp(`^\/static\/.*\\.(?:${cacheFileTypes})$`),
    new workbox.strategies.CacheFirst({
      cacheName: cacheName,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 42,
        }),
      ],
    }),
  );

  if (configure) {
    configure(workbox);
  }
}
