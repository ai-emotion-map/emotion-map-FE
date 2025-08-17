import { image } from "framer-motion/client";
import { title } from "process";
import React from "react";
import Tag, { TagVariant } from "./common/tag/Tag";
import clsx from "clsx";
import NaverMap from "./navermap/NaverMap";
import Button from "./common/button/Button";
import { X } from "lucide-react";

const BottomSheet = ({
  isExpanded,
  setIsExpanded,
  selectedMarker,
  setIsOpen,
}: {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMarker: {
    lat: number;
    lng: number;
    emotion: TagVariant;
  } | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const data = {
    title: "서울특별시청",
    address: "장소 주소",
    content:
      "장소에 대한 설명이나 리뷰가 여기에 들어갑니다. 장소에 대한 설명이나 리뷰가 여기에 들어갑니다.장소에 대한 설명이나 리뷰가 여기에 들어갑니다.장소에 대한 설명이나 리뷰가 여기에 들어갑니다.장소에 대한 설명이나 리뷰가 여기에 들어갑니다.장소에 대한 설명이나 리뷰가 여기에 들어갑니다.",
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEBUQEhIVFRUVFRAVDxUVFRAQDxUVFRUWFhcVFhUYHSggGBolGxUVITEiJSkrLy4uGB8zODMsNygtLisBCgoKDg0OFxAQGi0lHR0tLS0rLS0tLS0tKy0tLS0tLSstLS0tLS0tLS0tLS0tLS0tKy0tLS0rLS0tLS0tLS0tLf/AABEIAMYA/gMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwABBAYFB//EADkQAAEDAgQEBAUBCAIDAQAAAAEAAhEDIQQSMUEFUWFxEyKBkQYyobHwwRQjQlJi0eHxB3IzQ4IX/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EAB0RAQEBAAMBAQEBAAAAAAAAAAABEQISITFBYRP/2gAMAwEAAhEDEQA/APdamsSmpzVAxqa1LamBUGESFqJBFFFEAOQFG5AUAFCjKEoqBGEARhVDAoqCtERRQqILCsIUQRYtWFSiCKirUKillLcmOS3IFOSXpzkmogU5LcmOSigpExCraqNLU5qW1NaohjUxqBqYEBBEqCtBFFapAJQOTHICgWUJCMoUEARBUETVQQVqBRERRRXCCkQVKwUVaiitBShUUUAOSnBNKW5FKckPWhyQ9AlyUU1yWUAq2C6pWxUamlNYUlqaxRD2pgSmpgQMCtAEYQWqUUQUSlko3JZQUShJVlAVVECjBSgmNRDArVBREWCrLkslWCiilWChRBEWoooioooooAclOKa4JTgiluKS9OKRUQJcllG8pZQRWxDKtioe16ayoseZEHqI3iojFRYBURiog3B6Y16wten03INQKkpYKrMgMlAXIXOQFyAnOSyVCUBKoMFG1yw4/EmlTNTLmylsiYMFwBjref7J+FrtqND2EOB5c+RGx6INeZUXoAqKCy9WHpLiuY4j8T5XNLB5A6CbS7/CDrw9EHLOx03GhuE0IHgqpVBU4oDlVKCVJWQRKW4qy5Kc5RVOKz1CmOckPKoW9LKNyAhUBKJpQFW0oLUCWHIwUTDAEQCAJgQwxi0sKzMTmlS0xoBUSg5GFNXEhCWpoajFJXUIDEQpLS2imCirow4nCB9NzD/E1zfcEL5yDVpOFahU8N9w4PDvCfltkqti4tAcLjrt9YbRXyHGtcMXWoVHBga6oXTENE2Gl5Fx2VnqXx7mC/5CpfJiaFSlUb84GV9M7gtM3BFx9CU+t8f4YGBSrEc4p9ds3RcVxOh+7JZL4DhSc9oJANwBubkn9LrzRSfmLzHysdJkwcgIyjX5nNEcytzP1i9vyu/x3xQzE0Iotc0PcWkuygwPmiCbHSZ5ryeJNEMptkwCS0C3UpHBTFMOewnyw8iwm0uA5yJiN0ni1NrarKtOoXgw10yHeI0kyQNrfZc66cf6+ocJaDh6RBmadO+s+UbraGqcGwoGGogANHhU4A0AyiAOgWo0UGcBC5q0eEqNNQZSEJWh1JAaSlVnJQFafCVGkplXGNyWWraaKE0U9XIxFinhLaKKMUk9PHlupIW0rr03Ukvwrq+p48wUkxtNeg2gEYoBaxNee2mmspLc2gmtoq4msTKSYKS3NooxSTqdmEUU1lFavCRtYnQ7F06Ce2ijYE5oV6p2LFFGKSYEQTqdgCmvkXx1QFPidSQSajab2eVz5s0AAAXux3aF9hXzD/ltpFajV8wIZDHtAcQ4PnTex03kqyM8q551JpdnIqAONIeY0ss06zc0AGRMObMb3hdzgfg5lTC0q7TmdmdVeIguGcua2Du0hp/+VxXw/wADxWPZVDYaMrzBLqLPFdcGIJLS65iBrrJX2DgZH7KML4o8Q03Uy5sGKhaQ5zQf6pMLUlZt18l4fw0MLHkVH5KbKbntfTa17i4jxAwmXNLibnbQRrmxOHbnyOFzm8QAOaQbBtjf1Gq7H4n+B3YPDsfh6z3NphpLSA6Hi5qMDpGtw10hpiNAuLwmEbXeKc1X1xUALnAscXTnJ0s0NzABc8v66bH1ngHFMPWptZSdBY1rSwgtc3KI03FtQvSc1fG+OVH4fFzSLmOY+ZBiJgSTuHQbLpv/ANRoMpgVKNU1RZ4YGeHOxDi7ftzW7wYnOO7LUOVcPgv+TKTzL6L2tMXBzxPOwXT8N45QxH/jeCREtPleJ6FOizlG5zUohG56U56dV7KIUhAXoTVTqdhuCAoHVUp1ZOp2OJVZ1ldXSjXTqdm1z0rOJWU1kIqXTqdmsVAmCovJbWTWVlrGNesxya168ynXThXTDXoCoiFRed46IYhXE16IqK/EXnCsr8ZXE16Iqpjai81tVOZVTDXotcmByxNqpgrKYStJcvL49w1uJpFjhpdvdbPFVGokha5bhzamFpOpNN5lhIFhyJj9Fz3COB+HxD9r8NxYCXtp5y5jaxM+IGnUbhugPpHccQw4ddZKOAvvut8uMuM8Oea6MY/x2Zednaeui8yph8PgmOqBvmvc3df+Fv8AhZ8XxFuGZMcoGl+S+f8AxT8SPe6JJJzFjAZgRYuGjddeg0lZyRdteb8S40V65MZjIzxFo2PTb1XN4mjmMi8CpJkRlblH+OendbWVQ+zpdc5rZWSATeTOWAT6dlhx7bTls/ytLSMgFt+UhxCyNGBogua2bimc0AuAsCJE3XoYdhNCS4lzcwabZhlMxPUevaEqniYa51Nv84zbSABfv/sLW4BtAsgS7xHGC4iDbubD/V1R6PDPiivh2NfndVpZQclQy+N4ebiL6yD0Xc8G43SxVPxKR0s9ps9h5EfroV8yeWCiwwQC0NAiBJsenI6j6ouA8SdhKoqxYHw8QwaOAMZ2jmNeqLr6uXJbnIaVZr2h7CHNcAWkXBB0KpxWmlOckuciJQEqIBxQq3FAXqglbUvxFbal1KENKY0pLU1qinscizpbSilAedFmSkQWkpoqIhUSgjARDRUTG1UgNRZEGkYhGMQsWUo20yhjcKyIVFkawpjWlUac0hLL4/PzkgBISaz4ER2W58crMrlPjjiTgcrSNDqQNtgddFwRrAy4uOW3ivvmdAmBoSJMeq7b4w4b4p8QXLdhEmOUyJtyXzjF0ar3CnTa8NEeUggCDMu56/kLhzvrtx+N+JrVH6DKXSKdx5W6Znbi20rE5wAyl8tptLRDjJcW3t+iB9JzPI1+Z7wRmjytZvG6yYtjmN2iY/qcb69lNMetwGv+6LTBEuA0JmARE9j9V7FPDtdXEmQ0E7jURlnfQ6arwvhoWIvfzkjkLD6g7Whe1RIbRqVrGXOmDBysIblmxuB/opCmV2tqVmU5hrfMbQfJo2NN1mxjS+oGizcxfHNsi5ANySIv1TsHUyUzXqfM4mAYPlvAM6baLI2oSc78jTVpu8JkwWtb5yXGbcwNVWXUfAHGZz4YukCXUbg63c0dNx69l2TnL45QxTqTqdRsNc2Ku0dLgTBBg9JX1PAY9takys3R7Qex3HoZC1xXWpz0h1VC9yy1XrWJpz6yWayzOcUEq4mtJqqMrXWQuVMN1LCW63h6JtRZS5XnUxezc2oizrE2ojD0w7Nocja5YW1kxtcK4a3ApgKxCsEba4TDW5pTGrAysE1tYJibG0NCY1qxNxI5poxY5phsbQFRWU4wc1QxY5phsaHJb2giClOxISziVZKluvPxByOgj12IXFfEvE8lXw6dFzjM5g21+R0/Oi7bjjw6g/WQ0kRrZcJwD4j8Z76bwJAPhnWTe3sFnnNXjccfiv2mXVCC0SeTfwfZebWfMkOJn5p3K9/4g4o+q/wmDQkOOxOoA2FpEX0K8R+Hdu2LTI0hcHaPY4Thv3IrZoAkE3kZZOXUGDy6dV6+bN4VAtDZh9YAQA3YHkXGJvoeq8/hjDTpNAPmMyJ8tyT5v+uWfVaKOMFN7ntGZ7xBy3IAsL6Aa+y38YbsZTdVqtpatAzvDSe0XPT2S8aWNzl4EAtDWnL5jGpieonskYXFimxwdkpl1swc59YjQ3ywT6wJ0sn4Wg0tJp0y+PkqVC1jS697mQeVrQqlYsR4ocXkNBcQ02kBu5v35rp/gXiMiph7eQ52RGjtfrf1XK4yiburVGX/AIGkiTzmZMJ3AcZ4OIpu0DobA0ym1+skH0VnlSvpNR6SXSrIlCKRXRnSiEMwtDmJdVspi6Q4oaZRPCoNEqYS+jovnVG4TZZWvcNwiq1JaAYBtcHdaxjWhwjVW2qBZYy4jWTCaarSBMTy3RWhzkUpVN4IsO9xKLx76eh0QOD7WCoOtKWcSAOR2hJqYg/2VRvD00PkLzv2gjUeoWilXafwoGeJdOFWdlnbXbvHVPbiKRGuiqCBlNNIpHiAAkGB1RU8aDYER1KBvhuCtjOZCVUrjT7ShDuSK01WNLSDFwQvn1Xg9MVcjHBrpdDrCBqbbaLtX4umy9R7WjmTC4DHURTqHENflHm8PLNVpzSGvO5kXjZc+f41HMY/BVWvLIzgGRAGW9/XVU1lYC7C1oHKx6GZ5p9PGVSfJRbrqGubPudV0PCsJUqYcvqtkZyLWEN3ub336eq4SbXa+R51FrzTLgJkWO0QST2t6wra9w/d0hcfNUNpNpc0/m66OjhGPbtEeQctQLJWK4S8NJbd0QPYm3XZXlKnHHM4kZW5i51R02m97D5dBsp49QludwnKMo0Yxpn5jI56E+1keNoFvlc4kk6Foc8tk6dbFJrOIs1mQCJzkOLtwXT3Fv8ACRLTsdlDcrcpECaljJM8tdf8lYKDc1RrCbuexsjaTH3K11niJa973blsim2dspGmnssuBfFem6LipTd1PnFlpj9fXA2BzgCVWdGRtCzSZ+66aYb41/ugc8Qlkbn06qmj/U3V1MCI1VWnlZRwmRpyQ0heDeylqyI0zp12CS9p5GfSEbXNBl1o5azYjRKcwF2roglxh0ztInRNTF06p0Ga+o294Ts07336JTqRI+beIub80TKYbBOvUW9JKaYY0ATfa8XlHkgc7e3sq1Ji/pB+9lToBggidJIb7Srphw5H3ERHdE+j5QQCZ7QClWFxf6jXmDa6dRfMcthAk8/qnY6kGgZjNffRC6jG5HMbla3R3S6jotA62JMctNeyuphEe8aTr0VUiAJjpfmtBqk/xD1Bt7oX0r+a4mYhwM/qmmENxAMS2L9SD6HRN/aW6RvbYeijqI1BifT6pb6NQdfr7fRXTDzifLJnpcadkBrRcOtr07FIcwgzEHcwEmpUtp+ghEfPvjLHvq4p4eSAw5WNvAEAzHXX2TOD4tvglrgXQIP88B0tDTO2q77C/DuGxb6bqjRmE5jN4BiCAYO2vP0XU4v4C4fWZ4TafhlmXz08rH3vcEEO9QdVx5Sy66bLJHx1jnElxfA3u0x6gQPRb8ZVrU3sp06zmy1gFPLmBJ9bmV7nxJ8LvwbgNaOduaqcoa1h1z38ptGgB+yOFvoVsfTGrmNcWEfKSQRrvAk94WOP1uzwnhuExQqNdVZDQZMEX20nqulfjmmQBz6LpW4RjgdMoAmInfVc7xQYQyG1qeblnbP3W7UnHHz34lxrg/K6W6XAANpt1F5XkAsgk+I+1pgC2pn0XYcVpUXjI4hwGnP0Oy5bFcLymaXiE3sAX2iTcDlK56uJhqjj5A5hBmGb+8WK28K4c5+JYBdup0kBpOvr91nwXC8W5zangOJBBzOho01PRdfwfAvYC9+UOJjynNAuY73+isTHvmuQYmde10xtYGBN9+vVZALTpoZk79N1KJa4wHA7iLTPKNdCF07M42ZBeDfTaELgIvE9In0SnQPKJ6yTa11lw9VrnkCI8pGo0mTGtv1VvKTxMbpBkkbb9YWenMm09tI2TAL6kR3BPW9kbnFuhA7wUtakYm13x8wnb5iO8k379d0wNqOlvaSIP0BPJBUcNWumdf8A125iZ5jQwmBrI0Ljf+JvPqpKdTKTQ6NCY1EXIHIb9o7JxpuiDcbg6LJR6RfWXC032HU+y0hzrS6DaIIje0ppixh5J5z00vH9kZpnToec7oarnE+UNIG8uDh10ThHMTzme4v36pphbMPuOswT+t1eTlaDe5ajpsdOog9dPojdTGxFvQHuYkqgW4fcyBzm90xuFkWczsTfQkXm2yGhTIAlwgdS489U13Qj09ucygU3Dn/sQNG3M6QTNuSt1IzBMEi4dlkTuJ6T7JrWiRe45kj/AHqjeG+25JsOUkoeEDCuI8ozc7w0jnoUD8KRId5D/VAnty05rSGt+YRMXmQOf3j2VuAOsa9Y+yvqeM7sICYDhcaXLvWBAvKXU4awDzVGD3g3vY7rfAF4G2xCDE0Wu+dgdPRpGo2JP5CDIOH0GnPIBEeZpqB89wdNbAIK/ES1+dlZ+bK0ROUAEzLpO3vfZbhTbGoAFwLDf6FKDGn5ssXFwIFjYAqWLHPYvGOqVQWvc95Jz5gIBynytBPmsPodEGEfSfX8JzGy02cCW+03BzGOXInfoa2ApOuWMdoR5QBbfmrfgKRM+Gw2yiZ/Vc+l1Z4Q/BtGpLcw80lxzDYPA2ufdebi3UaTg3OMvl0a3JJny2Ekxy6L3nYZn8TAL3uXCOVzexKzVeF0nHP4dP8ApO/06K2DBha1J7otESIcBUMTcCACLHdenTwuHcAZBkDLIYTeL3SafD6TCMlNoiMukgj+XlqdFokydrebnIj9Cpxln0kKfTpZcoD817NhzdNT277JWGyEixjpLT2ibLSX6XnlMBLDiNLfT1/OS0vi8SGAEGnmB0FwdrmVynGaT2uJZTOub5S9s9CBY8vWSF1mZt8zpOw1Ot9B0S6lVhEf3Hos8uPaHmY49nEHtqAEvJOUWc7K0ESXF2X7G0TZTAVntrZQwgXl0VA1xy32mbQCDv3C62W65QSNPzZWyqP5f9Kf5pJJ8Y3teSD4mXKfLHmeRy6D0SsVhmv+ckm8Xa0R0iDfryXoPjdpv0+/uhYwHeO0D81WrxjUrywZ1Glo06foE6m3cchsFFFuOY2NuAfwxr9EYYQAJ/mttCiiCg8+xi90WYzr+oVqJCjY5xMA+9h9FbSRad+QNwVFFQ1tY/cI2VDF723sVFFDDBWkXnsLBQEa39TKiiaueDpvF5H0RGprHbTmooqyvLbVC4geuqpRUU5t5v7/AKJhHMTyUUWWoCpUDT+Qo4+XuqUQgTiPXa6jp5mArUUaCX9teQn3VteSfyVFFAFWoBqJj0SZzTyEd5lRRAL41vvultAt6xqdOd+qtRATqYAv6WCtrrx2uf8AaiiCVHWk3Bm3ZBh6wkyLdIlRRCv/2Q==",
    tags: ["가족 🏠", "우정 🤝", "위로/치유 🌱", "외로움 🌙"] as const,
  };

  function openNaverDirections(destinationName: string) {
    const url = `https://map.naver.com/v5/search/${encodeURIComponent(destinationName)}`;
    window.open(url, "_blank");
  }

  return (
    <div
      className={`flex flex-col z-50 fixed left-1/2 bottom-0 transform -translate-x-1/2 w-full max-w-sm bg-background rounded-t-2xl border border-gray-200 transition-all duration-300 ease-in-out ${
        isExpanded ? "h-[100vh]" : "h-[40vh]"
      }`}
    >
      {/* 드래그 핸들 */}
      <div
        className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      ></div>

      <X
        className="absolute cursor-pointer top-12 right-6"
        color="#a6a6a6"
        onClick={() => setIsOpen(false)}
      />

      {/* 내용 */}
      <div className="flex flex-col flex-1 gap-4 p-4 overflow-y-auto">
        <div>
          <h2 className="mb-1 text-lg font-bold">{data.title}</h2>
          <h4 className="text-sm">{data.address}</h4>
        </div>

        <div
          className={clsx(
            `flex items-start gap-3`,
            isExpanded ? "flex-col" : "flex-row"
          )}
        >
          <img
            src={data.image}
            alt={data.title}
            className={clsx(
              "rounded-lg",
              isExpanded ? "w-full h-auto" : "w-[150px] h-28"
            )}
          />
          <p className={!isExpanded ? "h-28 overflow-hidden" : ""}>
            {data.content}
          </p>
        </div>

        <div
          className={clsx(
            "flex gap-2 py-1",
            isExpanded
              ? "flex-wrap"
              : "overflow-x-auto whitespace-nowrap scrollbar-hide"
          )}
        >
          {data.tags.map((tag) => (
            <Tag key={tag} variant={tag} />
          ))}
        </div>

        {isExpanded && (
          <>
            <div>
              <NaverMap
                markers={selectedMarker ? [selectedMarker] : []}
                height="170px"
              />
            </div>
            <div className="mb-3">
              <Button
                onClick={() => {
                  if (selectedMarker) {
                    openNaverDirections(data.title);
                  }
                }}
              >
                장소 검색하기
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BottomSheet;
